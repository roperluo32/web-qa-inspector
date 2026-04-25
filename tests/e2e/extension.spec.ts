import { test, expect, chromium, type BrowserContext } from '@playwright/test';
import { createServer, type Server } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const extensionPath = resolve(process.cwd(), '.output/chrome-mv3');

async function startFixtureServer(): Promise<{ server: Server; baseUrl: string }> {
  const server = createServer((req, res) => {
    const name = req.url?.replace(/^\//, '') || 'good-page.html';
    try {
      const html = readFileSync(resolve(process.cwd(), 'tests/fixtures', name), 'utf8');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(html);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });
  await new Promise<void>((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Unable to start fixture server');
  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
}

async function launchWithExtension(): Promise<{ context: BrowserContext; extensionId: string }> {
  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
  });
  let [background] = context.serviceWorkers();
  if (!background) background = await context.waitForEvent('serviceworker');
  const extensionId = background.url().split('/')[2];
  return { context, extensionId };
}

test.describe('Web QA Inspector extension', () => {
  test('scans a fixture page from the popup', async () => {
    const { server, baseUrl } = await startFixtureServer();
    const { context, extensionId } = await launchWithExtension();
    const page = await context.newPage();
    await page.goto(`${baseUrl}/bad-links-page.html`);
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup.html?scanUrl=${encodeURIComponent(page.url())}`);
    await popup.getByRole('button', { name: /scan current page/i }).click();
    await expect(popup.getByText('JavaScript link found')).toBeVisible({ timeout: 10_000 });
    await expect(popup.locator('.metric.warn')).toContainText('Warnings');
    await context.close();
    server.close();
  });

  test('exports reports for free users and supports language switching', async () => {
    const { server, baseUrl } = await startFixtureServer();
    const { context, extensionId } = await launchWithExtension();
    const page = await context.newPage();
    await page.goto(`${baseUrl}/good-page.html`);
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup.html?scanUrl=${encodeURIComponent(page.url())}`);
    await popup.getByRole('button', { name: /scan current page/i }).click();
    await expect(popup.locator('.score-card')).toContainText('Complete Product Launch Checklist', { timeout: 10_000 });
    const downloadPromise = popup.waitForEvent('download');
    await popup.getByRole('button', { name: 'HTML' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/web-qa-report-.*\.html/);
    await popup.locator('.locale-select').selectOption('zh_CN');
    await expect(popup.getByText('本地发布审计')).toBeVisible();
    await context.close();
    server.close();
  });
});
