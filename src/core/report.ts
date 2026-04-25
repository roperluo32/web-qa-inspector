import type { ScanIssue, ScanResult } from '../shared/types';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char] ?? char);
}

export function generateHtmlReport(result: ScanResult): string {
  const issueRows = result.issues
    .map(
      (item) => `<tr><td>${escapeHtml(item.severity)}</td><td>${escapeHtml(item.category)}</td><td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.message)}</td></tr>`,
    )
    .join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Web QA Report</title><style>body{font-family:Georgia,serif;margin:40px;color:#17201a;background:#f8f2e8}h1{font-size:32px}.score{font-size:56px;font-weight:700}.card{background:white;border:1px solid #1c2a2040;border-radius:18px;padding:24px;margin:18px 0;box-shadow:8px 8px 0 #17201a}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #ddd;padding:10px;text-align:left}</style></head><body><h1>Web QA Inspector Report</h1><p>${escapeHtml(result.url)}</p><div class="card"><div class="score">${result.summary.score}</div><p>${result.summary.errors} errors, ${result.summary.warnings} warnings, ${result.summary.info} info, ${result.summary.passed} checks passed</p></div><div class="card"><table><thead><tr><th>Severity</th><th>Category</th><th>Issue</th><th>Message</th></tr></thead><tbody>${issueRows}</tbody></table></div></body></html>`;
}

export function generateCsvReport(result: ScanResult): string {
  const header = ['severity', 'category', 'id', 'title', 'message', 'selector'];
  const rows = result.issues.map((issue) =>
    [issue.severity, issue.category, issue.id, issue.title, issue.message, issue.selector ?? ''].map(csvCell).join(','),
  );
  return [header.join(','), ...rows].join('\n');
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function groupIssues(issues: ScanIssue[]): Record<string, ScanIssue[]> {
  return issues.reduce<Record<string, ScanIssue[]>>((groups, item) => {
    groups[item.category] ??= [];
    groups[item.category].push(item);
    return groups;
  }, {});
}
