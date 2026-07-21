import { LinkChecker } from '../validators/LinkChecker';
import { logger } from '../utils/logger';

async function main() {
  logger.info('=== Link Checker ===');
  const checker = new LinkChecker();
  await checker.checkAll();
  logger.success('Link checking complete');
}

main().catch(console.error);
