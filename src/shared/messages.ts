import type { ScanResult } from './types';

export const MESSAGE_SCAN_PAGE = 'WEB_QA_SCAN_PAGE';

export interface ScanPageMessage {
  type: typeof MESSAGE_SCAN_PAGE;
}

export interface ScanPageResponse {
  ok: boolean;
  result?: ScanResult;
  error?: string;
}

export type RuntimeMessage = ScanPageMessage;
