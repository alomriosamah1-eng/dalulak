import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger';
import { SETTINGS } from '../config/settings';

export interface LinkCheckResult {
  url: string;
  status: 'ok' | 'redirect' | 'broken' | 'error';
  statusCode?: number;
  timeMs?: number;
  error?: string;
  checkedAt: string;
}

export class LinkChecker {
  private results: Map<string, LinkCheckResult> = new Map();

  async checkUrl(url: string): Promise<LinkCheckResult> {
    const existing = this.results.get(url);
    if (existing) return existing;

    const start = Date.now();
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000),
        redirect: 'follow',
      });

      const result: LinkCheckResult = {
        url,
        statusCode: response.status,
        timeMs: Date.now() - start,
        checkedAt: new Date().toISOString(),
        status: response.ok ? 'ok' : response.status >= 300 && response.status < 400 ? 'redirect' : 'broken',
      };

      this.results.set(url, result);
      return result;
    } catch (error) {
      const result: LinkCheckResult = {
        url,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        checkedAt: new Date().toISOString(),
      };
      this.results.set(url, result);
      return result;
    }
  }

  async checkAll(dataDir: string = SETTINGS.processedDir): Promise<LinkCheckResult[]> {
    const results: LinkCheckResult[] = [];
    
    if (!existsSync(dataDir)) {
      logger.error(`Data directory not found: ${dataDir}`);
      return results;
    }

    const files = readdirSync(dataDir).filter(f => f.endsWith('.json'));
    logger.info(`Checking links from ${files.length} files...`);

    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(join(dataDir, file), 'utf-8'));
        const urls = this.extractUrls(data);
        
        for (const url of urls) {
          const result = await this.checkUrl(url);
          results.push(result);
          logger.progress(results.length, urls.length, `URLs checked`);
        }
      } catch (error) {
        logger.error(`Error processing ${file}:`, error);
      }
    }

    this.saveReport(results);
    return results;
  }

  private extractUrls(data: unknown): string[] {
    const urls: string[] = [];
    if (typeof data === 'object' && data !== null) {
      const obj = data as Record<string, unknown>;
      if (typeof obj.officialUrl === 'string') urls.push(obj.officialUrl);
      if (Array.isArray(obj.alternativeUrls)) {
        for (const u of obj.alternativeUrls) {
          if (typeof u === 'string') urls.push(u);
        }
      }
      if (Array.isArray(obj.links)) {
        for (const u of obj.links) {
          if (typeof u === 'string') urls.push(u);
        }
      }
    }
    return urls;
  }

  private saveReport(results: LinkCheckResult[]) {
    const report = {
      generatedAt: new Date().toISOString(),
      total: results.length,
      ok: results.filter(r => r.status === 'ok').length,
      redirect: results.filter(r => r.status === 'redirect').length,
      broken: results.filter(r => r.status === 'broken').length,
      error: results.filter(r => r.status === 'error').length,
      details: results,
    };

    const path = join(SETTINGS.logsDir, `link-check-${Date.now()}.json`);
    writeFileSync(path, JSON.stringify(report, null, 2));
    logger.success(`Report saved to ${path}`);

    // Stats summary
    logger.divider();
    logger.info('Link Check Summary:');
    logger.info(`  Total: ${report.total}`);
    logger.info(`  ✅ OK: ${report.ok}`);
    logger.info(`  🔄 Redirects: ${report.redirect}`);
    logger.info(`  ❌ Broken: ${report.broken}`);
    logger.info(`  ⚠️ Errors: ${report.error}`);
    logger.info(`  Health: ${report.total > 0 ? ((report.ok / report.total) * 100).toFixed(1) : 0}%`);
  }
}
