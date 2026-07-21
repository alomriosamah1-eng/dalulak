import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger';
import { SETTINGS } from '../config/settings';
import { extractDomain } from '../utils/helpers';

export interface CollectionStats {
  totalFiles: number;
  totalResources: number;
  byCategory: Record<string, number>;
  byLanguage: Record<string, number>;
  byPricing: Record<string, number>;
  byType: Record<string, number>;
  byLevel: Record<string, number>;
  avgQuality: number;
  domains: Record<string, number>;
  arabicResources: number;
  freeResources: number;
}

export function generateStats(): CollectionStats {
  const stats: CollectionStats = {
    totalFiles: 0,
    totalResources: 0,
    byCategory: {},
    byLanguage: {},
    byPricing: {},
    byType: {},
    byLevel: {},
    avgQuality: 0,
    domains: {},
    arabicResources: 0,
    freeResources: 0,
  };

  const dataDirs = [SETTINGS.rawDir, SETTINGS.processedDir, SETTINGS.finalDir];

  for (const dir of dataDirs) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter(f => f.endsWith('.json'));
    stats.totalFiles += files.length;

    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
        stats.totalResources++;

        // Handle both single objects and arrays
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
          if (item.category) {
            stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;
          }
          if (item.language) {
            stats.byLanguage[item.language] = (stats.byLanguage[item.language] || 0) + 1;
          }
          if (item.pricing) {
            stats.byPricing[item.pricing] = (stats.byPricing[item.pricing] || 0) + 1;
          }
          if (item.type) {
            stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
          }
          if (item.level) {
            stats.byLevel[item.level] = (stats.byLevel[item.level] || 0) + 1;
          }
          if (item.officialUrl || item.url) {
            const domain = extractDomain(item.officialUrl || item.url);
            stats.domains[domain] = (stats.domains[domain] || 0) + 1;
          }
          if (item.language === 'ar') stats.arabicResources++;
          if (item.pricing === 'free' || item.isFree === true) stats.freeResources++;
          if (item.quality) stats.avgQuality += item.quality;
        }
      } catch {
        continue;
      }
    }
  }

  if (stats.totalResources > 0) {
    stats.avgQuality = Math.round(stats.avgQuality / stats.totalResources);
  }

  return stats;
}

export function printStats(stats: CollectionStats) {
  logger.divider();
  logger.info('📊 Data Collection Statistics');
  logger.divider();
  logger.info(`Total Files: ${stats.totalFiles}`);
  logger.info(`Total Resources: ${stats.totalResources}`);
  logger.info(`Arabic Resources: ${stats.arabicResources}`);
  logger.info(`Free Resources: ${stats.freeResources}`);
  logger.info(`Average Quality: ${stats.avgQuality}%`);

  logger.divider();
  logger.info('By Category:');
  for (const [cat, count] of Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])) {
    logger.info(`  ${cat}: ${count}`);
  }

  logger.divider();
  logger.info('By Language:');
  for (const [lang, count] of Object.entries(stats.byLanguage)) {
    logger.info(`  ${lang}: ${count}`);
  }

  logger.divider();
  logger.info('Top Domains:');
  const topDomains = Object.entries(stats.domains).sort((a, b) => b[1] - a[1]).slice(0, 20);
  for (const [domain, count] of topDomains) {
    logger.info(`  ${domain}: ${count}`);
  }
}

async function main() {
  logger.info('Generating data statistics...');
  const stats = generateStats();
  printStats(stats);
}

main().catch(console.error);
