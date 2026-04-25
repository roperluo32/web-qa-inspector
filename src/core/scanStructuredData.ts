import type { CategoryResult, ScanContext, ScanIssue } from '../shared/types';
import { issue, selectorFor } from './utils';

export function scanStructuredData({ document }: ScanContext): CategoryResult {
  const issues: ScanIssue[] = [];
  let passed = 0;
  const scripts = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json" i]'));

  if (scripts.length === 0) {
    issues.push(issue({ id: 'schema.jsonld.exists', category: 'structuredData', severity: 'info', title: '未发现 JSON-LD', message: '如页面需要富媒体搜索结果，可添加结构化数据。', selector: 'script[type="application/ld+json"]' }));
    return { issues, passed, metadata: { count: 0 } };
  }

  scripts.forEach((script) => {
    try {
      const parsed = JSON.parse(script.textContent || 'null');
      passed += 1;
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const hasType = items.some((item) => item && typeof item === 'object' && '@type' in item);
      if (!hasType) {
        issues.push(issue({ id: 'schema.jsonld.type', category: 'structuredData', severity: 'info', title: 'JSON-LD 缺少 @type', message: '建议为结构化数据提供 @type。', selector: selectorFor(script), element: script }));
      } else passed += 1;
    } catch {
      issues.push(issue({ id: 'schema.jsonld.valid', category: 'structuredData', severity: 'warning', title: 'JSON-LD 无法解析', message: 'application/ld+json 内容不是合法 JSON。', selector: selectorFor(script), element: script }));
    }
  });

  return { issues, passed, metadata: { count: scripts.length } };
}
