import { describe, expect, it } from 'vitest';
import { scanPage } from '../../src/core/scanPage';
import { loadFixture } from './testUtils';

function ids(name: string) {
  return scanPage(loadFixture(name), `https://example.com/${name}`).issues.map((issue) => issue.id);
}

describe('scanPage', () => {
  it('scores a complete page without core SEO errors', () => {
    const result = scanPage(loadFixture('good-page.html'), 'https://example.com/launch-checklist');
    expect(result.summary.score).toBeGreaterThanOrEqual(90);
    expect(result.issues.some((issue) => issue.severity === 'error')).toBe(false);
  });

  it('detects missing and weak SEO fields', () => {
    const issueIds = ids('bad-seo-page.html');
    expect(issueIds).toContain('seo.title.length');
    expect(issueIds).toContain('seo.description.exists');
    expect(issueIds).toContain('seo.h1.single');
    expect(issueIds).toContain('seo.lang.exists');
    expect(issueIds).toContain('seo.viewport.exists');
  });

  it('detects link issues', () => {
    const issueIds = ids('bad-links-page.html');
    expect(issueIds).toContain('links.href.exists');
    expect(issueIds).toContain('links.no.javascript');
    expect(issueIds).toContain('links.no.hash.only');
    expect(issueIds).toContain('links.duplicate');
  });

  it('detects accessibility basics', () => {
    const issueIds = ids('bad-accessibility-page.html');
    expect(issueIds).toContain('a11y.heading.order');
    expect(issueIds).toContain('a11y.button.name');
    expect(issueIds).toContain('a11y.input.label');
    expect(issueIds).toContain('images.alt.exists');
  });

  it('detects structured data parse and type issues', () => {
    const issueIds = ids('structured-data-page.html');
    expect(issueIds).toContain('schema.jsonld.type');
    expect(issueIds).toContain('schema.jsonld.valid');
  });
});
