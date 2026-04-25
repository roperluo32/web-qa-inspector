import type { CategoryResult, ScanContext, ScanResult } from '../shared/types';
import { scanAccessibility } from './scanAccessibility';
import { scanImages } from './scanImages';
import { scanLinks } from './scanLinks';
import { scanOpenGraph } from './scanOpenGraph';
import { scanSeo } from './scanSeo';
import { scanStructuredData } from './scanStructuredData';
import { summarize } from './score';

export function scanPage(document: Document, url = document.location.href): ScanResult {
  const context: ScanContext = { document, url };
  const categoryResults: Record<string, CategoryResult> = {
    seo: scanSeo(context),
    openGraph: scanOpenGraph(context),
    links: scanLinks(context),
    images: scanImages(context),
    accessibility: scanAccessibility(context),
    structuredData: scanStructuredData(context),
  };
  const issues = Object.values(categoryResults).flatMap((result) => result.issues);
  const passed = Object.values(categoryResults).reduce((total, result) => total + result.passed, 0);

  return {
    url,
    title: document.title || url,
    scannedAt: new Date().toISOString(),
    summary: summarize(issues, passed),
    issues,
    metadata: Object.fromEntries(
      Object.entries(categoryResults).map(([name, result]) => [name, result.metadata ?? {}]),
    ),
  };
}
