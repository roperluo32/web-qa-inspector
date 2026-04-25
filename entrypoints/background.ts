import { MESSAGE_SCAN_PAGE, type ScanPageResponse } from '../src/shared/messages';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.info('Web QA Inspector installed');
  });

  browser.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MESSAGE_SCAN_PAGE || !sender.tab?.id) return undefined;
    return browser.tabs.sendMessage(sender.tab.id, message) as Promise<ScanPageResponse>;
  });
});
