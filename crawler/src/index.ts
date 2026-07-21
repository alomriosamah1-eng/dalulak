import { Crawler } from './core/Crawler';
import { logger } from './utils/logger';

async function main() {
  logger.info('=== Dalylak Crawler ===');
  logger.info('Starting resource collection...');
  logger.divider();

  const args = process.argv.slice(2);
  const sourceIndex = args.indexOf('--source');
  const sourceId = sourceIndex !== -1 ? args[sourceIndex + 1] : undefined;

  if (sourceId) {
    logger.info(`Running crawler for source: ${sourceId}`);
  } else {
    logger.info('Running crawler for all sources');
  }

  const crawler = new Crawler();

  try {
    await crawler.run(sourceId);
    process.exit(0);
  } catch (error) {
    logger.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
