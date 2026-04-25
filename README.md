# Web QA Inspector

Web QA Inspector is a free browser extension for local web page quality checks.

It audits the current page for SEO basics, Open Graph and Twitter Card metadata, links, images, basic accessibility issues, and JSON-LD structured data. Reports can be exported as HTML or CSV.

## Browser Targets

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## Current Version

Version `0.1.0` is free and does not include accounts, subscriptions, payment flows, or remote entitlement checks.

## Development

```bash
pnpm install
pnpm exec wxt prepare
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
```

## Build

```bash
pnpm build:chrome
pnpm build:edge
pnpm build:firefox
```

## Release Packages

```bash
pnpm zip:chrome
pnpm zip:edge
pnpm zip:firefox
```

## Privacy Policy

The privacy page is in `site/privacy.html` and can be deployed with GitHub Pages.
