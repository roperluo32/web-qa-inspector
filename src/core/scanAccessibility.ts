import type { CategoryResult, ScanContext, ScanIssue } from '../shared/types';
import { accessibleName, issue, selectorFor, textContent } from './utils';

export function scanAccessibility({ document }: ScanContext): CategoryResult {
  const issues: ScanIssue[] = [];
  let passed = 0;
  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
  let previousLevel = 0;
  headings.forEach((heading) => {
    const level = Number(heading.tagName.slice(1));
    if (previousLevel && level - previousLevel > 1) {
      issues.push(issue({ id: 'a11y.heading.order', category: 'accessibility', severity: 'warning', title: '标题层级跳级', message: `${heading.tagName.toLowerCase()} 出现在 h${previousLevel} 后，建议不要跳级。`, selector: selectorFor(heading), element: heading }));
    } else passed += 1;
    previousLevel = level;
  });

  const buttons = Array.from(document.querySelectorAll('button,[role="button"]'));
  buttons.forEach((button) => {
    if (!accessibleName(button)) {
      issues.push(issue({ id: 'a11y.button.name', category: 'accessibility', severity: 'error', title: '按钮缺少可访问名称', message: '按钮应包含文本、aria-label 或 aria-labelledby。', selector: selectorFor(button), element: button }));
    } else passed += 1;
  });

  const controls = Array.from(document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type="hidden"]), select, textarea'));
  controls.forEach((control) => {
    const id = control.getAttribute('id');
    const hasLabel = Boolean(id && document.querySelector(`label[for="${cssEscape(id)}"]`));
    const wrapped = Boolean(control.closest('label'));
    const aria = Boolean(textContent(control.getAttribute('aria-label')) || control.getAttribute('aria-labelledby'));
    if (!hasLabel && !wrapped && !aria) {
      issues.push(issue({ id: 'a11y.input.label', category: 'accessibility', severity: 'error', title: '表单控件缺少标签', message: '表单控件需要 label、aria-label 或 aria-labelledby。', selector: selectorFor(control), element: control }));
    } else passed += 1;
  });

  return { issues, passed, metadata: { headings: headings.length, buttons: buttons.length, controls: controls.length } };
}

function cssEscape(value: string): string {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(value);
  return value.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}
