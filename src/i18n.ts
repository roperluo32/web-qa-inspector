import type { IssueCategory, ScanIssue } from './shared/types';

export const supportedLocales = ['en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'de', 'fr', 'es', 'pt_BR'] as const;
export type AppLocale = (typeof supportedLocales)[number];

type UiKey =
  | 'eyebrow' | 'subcopy' | 'loading' | 'scanButton' | 'empty' | 'recentScans' | 'noIssues'
  | 'errors' | 'warnings' | 'passed' | 'cannotFindTab' | 'internalPage'
  | 'noScanResult' | 'scanFailed' | 'optionsTitle' | 'optionsKicker'
  | 'optionsBody' | 'clearHistory' | 'savedScans' | 'all' | 'error' | 'warning' | 'info';

type Dict = Record<UiKey, string>;

export const localeNames: Record<AppLocale, string> = {
  en: 'English',
  zh_CN: '简体中文',
  zh_TW: '繁體中文',
  ja: '日本語',
  ko: '한국어',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt_BR: 'Português',
};

const en: Dict = {
  eyebrow: 'Local launch audit', subcopy: 'Scan the current page for SEO, links, images, a11y basics, and schema issues.', loading: 'Loading', scanButton: 'Scan current page', empty: 'Open a public web page and run a local scan. No page content is uploaded.', recentScans: 'Recent scans', noIssues: 'No issues for this filter.', errors: 'Errors', warnings: 'Warnings', passed: 'Passed', cannotFindTab: 'Could not find the current tab.', internalPage: 'Browser internal pages cannot be scanned. Please switch to a regular web page.', noScanResult: 'The scan script did not return a result.', scanFailed: 'Scan failed. Please try again.', optionsTitle: 'Options & Local Data', optionsKicker: 'Web QA Inspector', optionsBody: 'This extension scans pages locally. Scan history is stored only in browser storage.', clearHistory: 'Clear scan history', savedScans: 'Saved scans', all: 'all', error: 'error', warning: 'warning', info: 'info',
};
const zh_CN: Dict = { ...en, eyebrow: '本地发布审计', subcopy: '扫描当前页面的 SEO、链接、图片、可访问性基础项和结构化数据问题。', loading: '加载中', scanButton: '扫描当前页面', empty: '打开一个公开网页并运行本地扫描。页面内容不会上传。', recentScans: '最近扫描', noIssues: '当前筛选下没有问题。', errors: '错误', warnings: '警告', passed: '通过', cannotFindTab: '找不到当前标签页。', internalPage: '浏览器内部页面无法扫描，请切换到普通网页。', noScanResult: '扫描脚本没有返回结果。', scanFailed: '扫描失败，请重试。', optionsTitle: '设置与本地数据', optionsBody: '此插件在本地扫描页面。扫描历史只保存在浏览器本地 storage 中。', clearHistory: '清除扫描历史', savedScans: '已保存扫描', all: '全部', error: '错误', warning: '警告', info: '提示' };
const zh_TW: Dict = { ...zh_CN, eyebrow: '本機發布稽核', subcopy: '掃描目前頁面的 SEO、連結、圖片、無障礙基礎項與結構化資料問題。', scanButton: '掃描目前頁面', empty: '開啟公開網頁並執行本機掃描。頁面內容不會上傳。', recentScans: '最近掃描', noIssues: '目前篩選下沒有問題。', errors: '錯誤', warnings: '警告', passed: '通過', cannotFindTab: '找不到目前分頁。', internalPage: '瀏覽器內部頁面無法掃描，請切換到一般網頁。', noScanResult: '掃描腳本沒有回傳結果。', scanFailed: '掃描失敗，請重試。', optionsTitle: '設定與本機資料', optionsBody: '此外掛在本機掃描頁面。掃描歷史只保存在瀏覽器本機 storage 中。', clearHistory: '清除掃描歷史', savedScans: '已儲存掃描', all: '全部', error: '錯誤', warning: '警告', info: '提示' };
const ja: Dict = { ...en, eyebrow: 'ローカル公開監査', scanButton: '現在のページをスキャン', recentScans: '最近のスキャン', errors: 'エラー', warnings: '警告', passed: '合格', all: 'すべて', error: 'エラー', warning: '警告', info: '情報', empty: '公開 Web ページを開いてローカルスキャンを実行します。ページ内容はアップロードされません。', optionsTitle: '設定とローカルデータ', clearHistory: '履歴を消去', savedScans: '保存済みスキャン' };
const ko: Dict = { ...en, eyebrow: '로컬 출시 점검', scanButton: '현재 페이지 스캔', recentScans: '최근 스캔', errors: '오류', warnings: '경고', passed: '통과', all: '전체', error: '오류', warning: '경고', info: '정보', empty: '공개 웹 페이지를 열고 로컬 스캔을 실행하세요. 페이지 콘텐츠는 업로드되지 않습니다.', optionsTitle: '설정 및 로컬 데이터', clearHistory: '스캔 기록 지우기', savedScans: '저장된 스캔' };
const de: Dict = { ...en, eyebrow: 'Lokaler Launch-Audit', scanButton: 'Aktuelle Seite scannen', recentScans: 'Letzte Scans', errors: 'Fehler', warnings: 'Warnungen', passed: 'Bestanden', all: 'alle', error: 'Fehler', warning: 'Warnung', info: 'Info', empty: 'Öffne eine öffentliche Webseite und starte einen lokalen Scan. Seiteninhalte werden nicht hochgeladen.', optionsTitle: 'Optionen & lokale Daten', clearHistory: 'Scanverlauf löschen', savedScans: 'Gespeicherte Scans' };
const fr: Dict = { ...en, eyebrow: 'Audit local avant lancement', scanButton: 'Analyser la page', recentScans: 'Analyses récentes', errors: 'Erreurs', warnings: 'Alertes', passed: 'Validés', all: 'tout', error: 'erreur', warning: 'alerte', info: 'info', empty: 'Ouvrez une page publique et lancez une analyse locale. Le contenu n’est pas téléversé.', optionsTitle: 'Options et données locales', clearHistory: 'Effacer l’historique', savedScans: 'Analyses enregistrées' };
const es: Dict = { ...en, eyebrow: 'Auditoría local de lanzamiento', scanButton: 'Analizar página actual', recentScans: 'Análisis recientes', errors: 'Errores', warnings: 'Advertencias', passed: 'Correctos', all: 'todo', error: 'error', warning: 'advertencia', info: 'info', empty: 'Abre una página pública y ejecuta un análisis local. El contenido no se sube.', optionsTitle: 'Opciones y datos locales', clearHistory: 'Borrar historial', savedScans: 'Análisis guardados' };
const pt_BR: Dict = { ...en, eyebrow: 'Auditoria local de lançamento', scanButton: 'Analisar página atual', recentScans: 'Análises recentes', errors: 'Erros', warnings: 'Alertas', passed: 'Aprovados', all: 'todos', error: 'erro', warning: 'alerta', info: 'info', empty: 'Abra uma página pública e execute uma análise local. O conteúdo não é enviado.', optionsTitle: 'Opções e dados locais', clearHistory: 'Limpar histórico', savedScans: 'Análises salvas' };

export const dictionaries: Record<AppLocale, Dict> = { en, zh_CN, zh_TW, ja, ko, de, fr, es, pt_BR };

export const categoryLabels: Record<AppLocale, Record<IssueCategory, string>> = Object.fromEntries(
  supportedLocales.map((locale) => [locale, { seo: 'SEO', openGraph: locale === 'zh_CN' ? '社交' : 'Social', links: locale === 'zh_CN' ? '链接' : 'Links', images: locale === 'zh_CN' ? '图片' : 'Images', accessibility: locale === 'zh_CN' ? '可访问性' : 'A11y', structuredData: locale === 'zh_CN' ? '结构化数据' : 'Schema' }]),
) as Record<AppLocale, Record<IssueCategory, string>>;

const issueEn: Record<string, { title: string; message: string }> = {
  'seo.title.exists': { title: 'Missing page title', message: 'Add a non-empty title element.' },
  'seo.title.length': { title: 'Title length needs review', message: 'Keep title length roughly between 10 and 60 characters.' },
  'seo.description.exists': { title: 'Missing meta description', message: 'Add a meta description for search result snippets.' },
  'seo.description.length': { title: 'Description length needs review', message: 'Keep meta description roughly between 50 and 160 characters.' },
  'seo.h1.exists': { title: 'Missing H1', message: 'Add one main H1 heading.' },
  'seo.h1.single': { title: 'Multiple H1 headings', message: 'Use one primary H1 heading where possible.' },
  'seo.canonical.valid': { title: 'Canonical URL issue', message: 'Add a valid canonical URL.' },
  'seo.lang.exists': { title: 'Missing html lang', message: 'Set the lang attribute on the html element.' },
  'seo.viewport.exists': { title: 'Missing viewport', message: 'Responsive pages should include a viewport meta tag.' },
  'og.title.exists': { title: 'Missing og:title', message: 'Add Open Graph title for social previews.' },
  'og.description.exists': { title: 'Missing og:description', message: 'Add Open Graph description for social previews.' },
  'og.image.exists': { title: 'Missing og:image', message: 'Add Open Graph image for social previews.' },
  'og.url.valid': { title: 'Invalid og:url', message: 'og:url should be a valid URL.' },
  'twitter.card.exists': { title: 'Missing Twitter Card', message: 'Add twitter:card to improve X/Twitter previews.' },
  'links.href.exists': { title: 'Link missing href', message: 'Anchor tags should have usable href values.' },
  'links.no.javascript': { title: 'JavaScript link found', message: 'Avoid javascript: links for accessibility and maintainability.' },
  'links.no.hash.only': { title: 'Hash-only link found', message: 'Confirm this link has a real target or interaction.' },
  'links.duplicate': { title: 'Duplicate link found', message: 'The same URL appears multiple times.' },
  'links.href.valid': { title: 'Invalid link URL', message: 'This href could not be parsed as a valid URL.' },
  'images.alt.exists': { title: 'Image missing alt', message: 'Non-decorative images should include alt text.' },
  'images.src.exists': { title: 'Image missing src', message: 'Image elements need a valid src or currentSrc.' },
  'images.dimensions.exists': { title: 'Image dimensions missing', message: 'Set width and height to reduce layout shift.' },
  'a11y.heading.order': { title: 'Heading level skipped', message: 'Avoid large jumps in heading levels.' },
  'a11y.button.name': { title: 'Button missing accessible name', message: 'Buttons need text, aria-label, or aria-labelledby.' },
  'a11y.input.label': { title: 'Form control missing label', message: 'Inputs need a label, aria-label, or aria-labelledby.' },
  'schema.jsonld.exists': { title: 'No JSON-LD found', message: 'Add structured data if the page needs rich search results.' },
  'schema.jsonld.valid': { title: 'Invalid JSON-LD', message: 'application/ld+json content must be valid JSON.' },
  'schema.jsonld.type': { title: 'JSON-LD missing @type', message: 'Structured data should include @type.' },
};

const issueZh: Record<string, { title: string; message: string }> = {
  'seo.title.exists': { title: '缺少页面标题', message: '页面需要一个非空的 title。' },
  'seo.title.length': { title: '标题长度不理想', message: '建议 title 保持在 10-60 个字符。' },
  'seo.description.exists': { title: '缺少 meta description', message: '建议提供用于搜索结果摘要的 meta description。' },
  'seo.description.length': { title: 'Description 长度不理想', message: '建议 description 保持在 50-160 个字符。' },
  'seo.h1.exists': { title: '缺少 H1', message: '页面应至少包含一个 H1 主标题。' },
  'seo.h1.single': { title: 'H1 数量过多', message: '建议保持一个主要 H1。' },
  'seo.canonical.valid': { title: 'canonical URL 问题', message: '建议提供有效 canonical URL。' },
  'seo.lang.exists': { title: '缺少 html lang', message: '建议在 html 标签上设置 lang。' },
  'seo.viewport.exists': { title: '缺少 viewport', message: '响应式页面应包含 viewport meta。' },
  'og.title.exists': { title: '缺少 og:title', message: '建议提供社交分享标题。' },
  'og.description.exists': { title: '缺少 og:description', message: '建议提供社交分享描述。' },
  'og.image.exists': { title: '缺少 og:image', message: '建议提供社交分享图片。' },
  'og.url.valid': { title: 'og:url 无效', message: 'og:url 应为有效 URL。' },
  'twitter.card.exists': { title: '缺少 Twitter Card', message: '如需优化 X/Twitter 分享，可添加 twitter:card。' },
  'links.href.exists': { title: '链接缺少 href', message: 'a 标签需要可用 href。' },
  'links.no.javascript': { title: '发现 JavaScript 链接', message: '不建议使用 javascript: 链接。' },
  'links.no.hash.only': { title: '发现纯 hash 链接', message: '请确认该链接有真实跳转或交互目标。' },
  'links.duplicate': { title: '发现重复链接', message: '同一 URL 出现多次。' },
  'links.href.valid': { title: '链接 URL 无法解析', message: 'href 无法解析为有效 URL。' },
  'images.alt.exists': { title: '图片缺少 alt', message: '非装饰性图片应提供 alt 文本。' },
  'images.src.exists': { title: '图片缺少 src', message: 'img 元素需要有效 src 或 currentSrc。' },
  'images.dimensions.exists': { title: '图片缺少宽高属性', message: '建议设置 width 和 height，减少布局偏移。' },
  'a11y.heading.order': { title: '标题层级跳级', message: '建议不要大幅跳过标题层级。' },
  'a11y.button.name': { title: '按钮缺少可访问名称', message: '按钮应包含文本、aria-label 或 aria-labelledby。' },
  'a11y.input.label': { title: '表单控件缺少标签', message: '表单控件需要 label、aria-label 或 aria-labelledby。' },
  'schema.jsonld.exists': { title: '未发现 JSON-LD', message: '如页面需要富媒体搜索结果，可添加结构化数据。' },
  'schema.jsonld.valid': { title: 'JSON-LD 无法解析', message: 'application/ld+json 内容不是合法 JSON。' },
  'schema.jsonld.type': { title: 'JSON-LD 缺少 @type', message: '建议为结构化数据提供 @type。' },
};

const localizedIssues: Record<AppLocale, Record<string, { title: string; message: string }>> = {
  en: issueEn, zh_CN: issueZh, zh_TW: issueZh, ja: issueEn, ko: issueEn, de: issueEn, fr: issueEn, es: issueEn, pt_BR: issueEn,
};

export function normalizeLocale(value?: string | null): AppLocale {
  const raw = (value || '').replace('-', '_');
  if (supportedLocales.includes(raw as AppLocale)) return raw as AppLocale;
  const lower = raw.toLowerCase();
  if (lower.startsWith('zh')) return lower.includes('tw') || lower.includes('hk') ? 'zh_TW' : 'zh_CN';
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('ko')) return 'ko';
  if (lower.startsWith('de')) return 'de';
  if (lower.startsWith('fr')) return 'fr';
  if (lower.startsWith('es')) return 'es';
  if (lower.startsWith('pt')) return 'pt_BR';
  return 'en';
}

export function t(locale: AppLocale, key: UiKey): string { return dictionaries[locale]?.[key] ?? en[key]; }
export function translateIssue(issue: ScanIssue, locale: AppLocale): ScanIssue {
  const translated = localizedIssues[locale]?.[issue.id] ?? issueEn[issue.id];
  return translated ? { ...issue, title: translated.title, message: translated.message } : issue;
}
