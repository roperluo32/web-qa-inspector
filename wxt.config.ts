import { fileURLToPath } from 'node:url';
import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

const srcAlias = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [react()],
    resolve: {
      alias: {
        '@': srcAlias,
      },
    },
  }),
  manifest: ({ browser }) => ({
    name: '__MSG_extensionName__',
    short_name: 'Web QA',
    description: '__MSG_extensionDescription__',
    default_locale: 'en',
    version: '0.1.0',
    permissions: ['activeTab', 'scripting', 'storage', 'tabs'],
    host_permissions: ['http://*/*', 'https://*/*'],
    action: {
      default_title: 'Web QA Inspector',
      default_icon: {
        16: 'icon-16.png',
        32: 'icon-32.png',
        48: 'icon-48.png',
        128: 'icon-128.png',
      },
    },
    icons: {
      16: 'icon-16.png',
      32: 'icon-32.png',
      48: 'icon-48.png',
      128: 'icon-128.png',
    },
    options_ui: {
      page: 'options.html',
      open_in_tab: true,
    },
    browser_specific_settings:
      browser === 'firefox'
        ? {
            gecko: {
              id: 'web-qa-inspector@example.com',
              strict_min_version: '109.0',
              data_collection_permissions: {
                required: ['none'],
              },
            },
          }
        : undefined,
  }),
});
