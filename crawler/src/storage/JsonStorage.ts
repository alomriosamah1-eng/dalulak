import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { SETTINGS } from '../config/settings';
import { logger } from '../utils/logger';
import type { CrawlResult } from '../core/Crawler';

export class JsonStorage {
  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    for (const dir of [SETTINGS.rawDir, SETTINGS.processedDir, SETTINGS.finalDir, SETTINGS.screenshotsDir]) {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    }
  }

  saveRaw(result: CrawlResult, sourceId: string): string {
    const filename = `${sourceId}-${result.id}.json`;
    const filepath = join(SETTINGS.rawDir, filename);
    writeFileSync(filepath, JSON.stringify(result, null, 2));
    return filepath;
  }

  saveProcessed(result: CrawlResult): string {
    const filename = `${result.id}.json`;
    const filepath = join(SETTINGS.processedDir, filename);
    writeFileSync(filepath, JSON.stringify(result, null, 2));
    return filepath;
  }

  saveAllProcessed(results: CrawlResult[]): string {
    const filename = `all-resources-${Date.now()}.json`;
    const filepath = join(SETTINGS.finalDir, filename);
    writeFileSync(filepath, JSON.stringify(results, null, 2));
    logger.success(`Saved ${results.length} resources to ${filepath}`);
    return filepath;
  }

  loadRaw(sourceId: string): CrawlResult[] {
    const results: CrawlResult[] = [];
    const files = readdirSync(SETTINGS.rawDir).filter(f => f.startsWith(sourceId));
    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(join(SETTINGS.rawDir, file), 'utf-8'));
        results.push(data);
      } catch (error) {
        logger.error(`Failed to load ${file}:`, error);
      }
    }
    return results;
  }

  loadAllRaw(): CrawlResult[] {
    const results: CrawlResult[] = [];
    const files = readdirSync(SETTINGS.rawDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(join(SETTINGS.rawDir, file), 'utf-8'));
        results.push(data);
      } catch {
        continue;
      }
    }
    return results;
  }

  getStats() {
    const rawCount = readdirSync(SETTINGS.rawDir).filter(f => f.endsWith('.json')).length;
    const processedCount = readdirSync(SETTINGS.processedDir).filter(f => f.endsWith('.json')).length;
    const finalCount = readdirSync(SETTINGS.finalDir).filter(f => f.endsWith('.json')).length;
    return { rawCount, processedCount, finalCount };
  }
}
