import type { CategoryResult, ScanContext, ScanIssue } from '../shared/types';
import { isValidUrl, issue, metaContent } from './utils';

export function scanOpenGraph({ document, url }: ScanContext): CategoryResult {
  const issues: ScanIssue[] = [];
  let passed = 0;
  const fields = [
    ['og.title.exists', 'og:title', 'Open Graph 标题'],
    ['og.description.exists', 'og:description', 'Open Graph 描述'],
    ['og.image.exists', 'og:image', 'Open Graph 图片'],
  ] as const;

  for (const [id, property, label] of fields) {
    const value = metaContent(document, `meta[property="${property}" i]`);
    if (!value) {
      issues.push(issue({ id, category: 'openGraph', severity: 'warning', title: `缺少 ${property}`, message: `建议提供 ${label}，用于社交分享预览。`, selector: `meta[property="${property}"]` }));
    } else passed += 1;
  }

  const ogUrl = metaContent(document, 'meta[property="og:url" i]');
  if (ogUrl && !isValidUrl(ogUrl, url)) {
    issues.push(issue({ id: 'og.url.valid', category: 'openGraph', severity: 'info', title: 'og:url 无效', message: 'og:url 存在但不是有效 URL。', selector: 'meta[property="og:url"]' }));
  } else if (ogUrl) passed += 1;

  const twitterCard = metaContent(document, 'meta[name="twitter:card" i]');
  if (!twitterCard) {
    issues.push(issue({ id: 'twitter.card.exists', category: 'openGraph', severity: 'info', title: '缺少 Twitter Card', message: '如需优化 X/Twitter 分享，可添加 twitter:card。', selector: 'meta[name="twitter:card"]' }));
  } else passed += 1;

  return { issues, passed, metadata: { ogUrl, twitterCard } };
}
