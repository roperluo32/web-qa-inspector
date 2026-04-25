import { describe, expect, it } from 'vitest';
import { generateCsvReport, generateHtmlReport } from '../../src/core/report';
import { scanPage } from '../../src/core/scanPage';
import { loadFixture } from './testUtils';

describe('report generation', () => {
  it('generates standalone html and csv reports', () => {
    const result = scanPage(loadFixture('bad-links-page.html'), 'https://example.com/bad-links');
    expect(generateHtmlReport(result)).toContain('Web QA Inspector Report');
    expect(generateCsvReport(result)).toContain('links.no.javascript');
  });
});
