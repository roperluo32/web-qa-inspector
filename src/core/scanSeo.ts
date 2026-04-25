import type { CategoryResult, ScanContext, ScanIssue } from '../shared/types';
import { isValidUrl, issue, metaContent, textContent } from './utils';

export function scanSeo({ document, url }: ScanContext): CategoryResult {
  const issues: ScanIssue[] = [];
  let passed = 0;
  const title = textContent(document.title);
  const description = metaContent(document, 'meta[name="description" i]');
  const h1s = Array.from(document.querySelectorAll('h1'));
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical" i]');
  const lang = textContent(document.documentElement.getAttribute('lang'));
  const viewport = metaContent(document, 'meta[name="viewport" i]');
  const robots = metaContent(document, 'meta[name="robots" i]');

  if (!title) {
    issues.push(issue({ id: 'seo.title.exists', category: 'seo', severity: 'error', title: '缺少页面标题', message: '页面需要一个非空的 title。', selector: 'title' }));
  } else {
    passed += 1;
    if (title.length < 10 || title.length > 60) {
      issues.push(issue({ id: 'seo.title.length', category: 'seo', severity: 'warning', title: '标题长度不理想', message: `当前 title 长度为 ${title.length}，建议保持在 10-60 个字符。`, selector: 'title' }));
    } else passed += 1;
  }

  if (!description) {
    issues.push(issue({ id: 'seo.description.exists', category: 'seo', severity: 'warning', title: '缺少 meta description', message: '建议提供用于搜索结果摘要的 meta description。', selector: 'meta[name="description"]' }));
  } else if (description.length < 50 || description.length > 160) {
    issues.push(issue({ id: 'seo.description.length', category: 'seo', severity: 'warning', title: 'Description 长度不理想', message: `当前 description 长度为 ${description.length}，建议保持在 50-160 个字符。`, selector: 'meta[name="description"]' }));
  } else passed += 2;

  if (h1s.length === 0) {
    issues.push(issue({ id: 'seo.h1.exists', category: 'seo', severity: 'error', title: '缺少 H1', message: '页面应至少包含一个 H1 主标题。', selector: 'h1' }));
  } else {
    passed += 1;
    if (h1s.length > 1) {
      issues.push(issue({ id: 'seo.h1.single', category: 'seo', severity: 'warning', title: 'H1 数量过多', message: `发现 ${h1s.length} 个 H1，建议保持一个主要 H1。`, selector: 'h1' }));
    } else passed += 1;
  }

  if (!canonical?.href) {
    issues.push(issue({ id: 'seo.canonical.valid', category: 'seo', severity: 'warning', title: '缺少 canonical', message: '建议提供 canonical URL，避免重复内容问题。', selector: 'link[rel="canonical"]' }));
  } else if (!isValidUrl(canonical.getAttribute('href') ?? '', url)) {
    issues.push(issue({ id: 'seo.canonical.valid', category: 'seo', severity: 'warning', title: 'canonical URL 无效', message: 'canonical href 不是有效 URL。', selector: 'link[rel="canonical"]', element: canonical }));
  } else passed += 1;

  if (!lang) {
    issues.push(issue({ id: 'seo.lang.exists', category: 'seo', severity: 'warning', title: '缺少 html lang', message: '建议在 html 标签上设置 lang。', selector: 'html' }));
  } else passed += 1;

  if (!viewport) {
    issues.push(issue({ id: 'seo.viewport.exists', category: 'seo', severity: 'error', title: '缺少 viewport', message: '响应式页面应包含 viewport meta。', selector: 'meta[name="viewport"]' }));
  } else passed += 1;

  if (robots) passed += 1;

  return { issues, passed, metadata: { title, description, h1Count: h1s.length, robots } };
}
