import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger';
import { SETTINGS } from '../config/settings';
import type { CrawlResult } from '../core/Crawler';

function main() {
  const formatArg = process.argv.find(a => a.startsWith('--format='));
  const format = formatArg ? formatArg.split('=')[1] : 'json';

  logger.info(`Exporting data in ${format} format...`);

  // Load all data from processed and final directories
  const allResources: CrawlResult[] = [];

  for (const dir of [SETTINGS.processedDir, SETTINGS.finalDir]) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
        if (Array.isArray(data)) {
          allResources.push(...data);
        } else {
          allResources.push(data);
        }
      } catch {
        continue;
      }
    }
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique = allResources.filter(r => {
    const key = r.url?.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  logger.info(`Loaded ${allResources.length} resources, ${unique.length} unique`);

  const timestamp = Date.now();
  let outputPath: string;

  switch (format) {
    case 'json': {
      outputPath = join(SETTINGS.finalDir, `export-${timestamp}.json`);
      writeFileSync(outputPath, JSON.stringify(unique, null, 2));
      break;
    }
    case 'md': {
      outputPath = join(SETTINGS.finalDir, `export-${timestamp}.md`);
      let md = `# دليلك التعليمي والعملي - تصدير البيانات\n\n`;
      md += `> تم التصدير: ${new Date().toLocaleDateString('ar-SA')}\n`;
      md += `> عدد الموارد: ${unique.length}\n\n`;
      
      const byCategory = new Map<string, CrawlResult[]>();
      for (const r of unique) {
        const cat = r.category || 'غير مصنف';
        if (!byCategory.has(cat)) byCategory.set(cat, []);
        byCategory.get(cat)!.push(r);
      }

      for (const [cat, items] of byCategory) {
        md += `## ${cat}\n\n`;
        for (const r of items) {
          md += `- [${r.title}](${r.url}) — ${r.description}\n`;
        }
        md += '\n';
      }

      writeFileSync(outputPath, md);
      break;
    }
    default:
      logger.error(`Unsupported format: ${format}`);
      process.exit(1);
  }

  logger.success(`Exported ${unique.length} resources to ${outputPath}`);
}

main();
