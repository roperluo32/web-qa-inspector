import type { CategoryResult, ScanContext, ScanIssue } from '../shared/types';
import { issue, selectorFor, textContent } from './utils';

export function scanLinks({ document, url }: ScanContext): CategoryResult {
  const issues: ScanIssue[] = [];
  let passed = 0;
  const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
  const seen = new Map<string, number>();
  let external = 0;
  let mailtoTel = 0;
  const base = new URL(url);

  anchors.forEach((anchor) => {
    const rawHref = textContent(anchor.getAttribute('href'));
    if (!rawHref) {
      issues.push(issue({ id: 'links.href.exists', category: 'links', severity: 'warning', title: '链接缺少 href', message: 'a 标签需要可用 href，或使用 button 表达交互。', selector: selectorFor(anchor), element: anchor }));
      return;
    }
    passed += 1;
    if (/^javascript:/i.test(rawHref)) {
      issues.push(issue({ id: 'links.no.javascript', category: 'links', severity: 'warning', title: '发现 javascript 链接', message: '不建议使用 javascript: 链接，会影响可访问性和可维护性。', selector: selectorFor(anchor), element: anchor }));
    }
    if (rawHref === '#' || rawHref.startsWith('#')) {
      issues.push(issue({ id: 'links.no.hash.only', category: 'links', severity: 'info', title: '发现纯 hash 链接', message: '请确认该链接有真实跳转或交互目标。', selector: selectorFor(anchor), element: anchor }));
    }
    if (/^(mailto|tel):/i.test(rawHref)) mailtoTel += 1;
    try {
      const absolute = new URL(rawHref, url);
      if (absolute.protocol.startsWith('http') && absolute.hostname !== base.hostname) external += 1;
      seen.set(absolute.href, (seen.get(absolute.href) ?? 0) + 1);
    } catch {
      issues.push(issue({ id: 'links.href.valid', category: 'links', severity: 'warning', title: '链接 URL 无法解析', message: `href "${rawHref}" 无法解析为有效 URL。`, selector: selectorFor(anchor), element: anchor }));
    }
  });

  const duplicates = Array.from(seen.entries()).filter(([, count]) => count > 1);
  duplicates.slice(0, 10).forEach(([href, count]) => {
    issues.push(issue({ id: 'links.duplicate', category: 'links', severity: 'info', title: '发现重复链接', message: `${href} 出现 ${count} 次。` }));
  });

  return { issues, passed, metadata: { total: anchors.length, external, mailtoTel, duplicates: duplicates.length } };
}
