import { scanPage } from '../src/core/scanPage';
import { MESSAGE_SCAN_PAGE, type ScanPageResponse } from '../src/shared/messages';

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  main() {
    browser.runtime.onMessage.addListener((message): Promise<ScanPageResponse> | undefined => {
      if (message?.type !== MESSAGE_SCAN_PAGE) return undefined;
      try {
        const result = scanPage(document, window.location.href);
        return Promise.resolve({ ok: true, result });
      } catch (error) {
        return Promise.resolve({ ok: false, error: error instanceof Error ? error.message : 'Unknown scan error' });
      }
    });
  },
});
