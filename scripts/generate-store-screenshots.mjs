import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const extensionPath = resolve(process.cwd(), '.output/chrome-mv3');
const screenshotsDir = resolve(process.cwd(), 'store-assets/screenshots');
mkdirSync(screenshotsDir, { recursive: true });

function startFixtureServer() {
  const server = createServer((req, res) => {
    const path = req.url?.replace(/^\//, '') || 'good-page.html';
    const fixture = path === 'bad' ? 'bad-links-page.html' : 'good-page.html';
    const html = readFileSync(resolve(process.cwd(), 'tests/fixtures', fixture), 'utf8');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(html);
  });
  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolveServer({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function getExtensionId(context) {
  let [background] = context.serviceWorkers();
  if (!background) background = await context.waitForEvent('serviceworker');
  return background.url().split('/')[2];
}

const { server, baseUrl } = await startFixtureServer();
const context = await chromium.launchPersistentContext('', {
  headless: false,
  viewport: { width: 1280, height: 800 },
  args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
});
const extensionId = await getExtensionId(context);

try {
  const page = await context.newPage();
  await page.goto(`${baseUrl}/bad`);
  const popup = await context.newPage();
  await popup.setViewportSize({ width: 1280, height: 800 });
  await popup.goto(`chrome-extension://${extensionId}/popup.html?scanUrl=${encodeURIComponent(page.url())}`);
  await popup.getByRole('button', { name: /scan current page/i }).click();
  await popup.getByText('发现 javascript 链接').waitFor({ timeout: 10000 });
  await popup.screenshot({ path: resolve(screenshotsDir, '01-popup-audit-results.png'), fullPage: true });

  await popup.locator('select').selectOption('pro_active');
  await popup.getByRole('button', { name: 'HTML' }).click();
  await popup.screenshot({ path: resolve(screenshotsDir, '02-pro-export-state.png'), fullPage: true });

  const options = await context.newPage();
  await options.setViewportSize({ width: 1280, height: 800 });
  await options.goto(`chrome-extension://${extensionId}/options.html`);
  await options.screenshot({ path: resolve(screenshotsDir, '03-options-local-data.png'), fullPage: true });
} finally {
  await context.close();
  server.close();
}
