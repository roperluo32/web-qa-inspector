import type { CategoryResult, ScanContext, ScanIssue } from '../shared/types';
import { issue, selectorFor, textContent } from './utils';

export function scanImages({ document }: ScanContext): CategoryResult {
  const issues: ScanIssue[] = [];
  let passed = 0;
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
  let lazy = 0;

  images.forEach((image) => {
    const alt = image.getAttribute('alt');
    const src = textContent(image.getAttribute('src') || image.currentSrc);
    if (image.getAttribute('loading') === 'lazy') lazy += 1;

    if (alt === null) {
      issues.push(issue({ id: 'images.alt.exists', category: 'images', severity: 'warning', title: '图片缺少 alt', message: '非装饰性图片应提供 alt 文本。', selector: selectorFor(image), element: image }));
    } else passed += 1;

    if (!src) {
      issues.push(issue({ id: 'images.src.exists', category: 'images', severity: 'error', title: '图片缺少 src', message: 'img 元素需要有效 src 或 currentSrc。', selector: selectorFor(image), element: image }));
    } else passed += 1;

    const hasDimensions = image.hasAttribute('width') && image.hasAttribute('height');
    if (!hasDimensions) {
      issues.push(issue({ id: 'images.dimensions.exists', category: 'images', severity: 'info', title: '图片缺少宽高属性', message: '建议设置 width 和 height，减少布局偏移。', selector: selectorFor(image), element: image }));
    } else passed += 1;
  });

  return { issues, passed, metadata: { total: images.length, lazy } };
}
