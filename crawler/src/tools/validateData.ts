import { Stats } from 'fs';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger';
import { SETTINGS } from '../config/settings';
import type { CrawlResult } from '../core/Crawler';

interface ValidationError {
  file: string;
  field: string;
  message: string;
}

export class DataValidator {
  private errors: ValidationError[] = [];

  validateAll(): { valid: boolean; errors: ValidationError[]; stats: ValidationStats } {
    const stats: ValidationStats = { total: 0, valid: 0, invalid: 0, byType: {} };
    const dir = SETTINGS.processedDir;

    if (!existsSync(dir)) {
      logger.error(`Directory not found: ${dir}`);
      return { valid: false, errors: [], stats };
    }

    const files = readdirSync(dir).filter(f => f.endsWith('.json'));
    logger.info(`Validating ${files.length} files...`);

    for (const file of files) {
      stats.total++;
      try {
        const data = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
        const fileErrors = this.validateResource(data, file);
        if (fileErrors.length > 0) {
          this.errors.push(...fileErrors);
          stats.invalid++;
        } else {
          stats.valid++;
        }
        const type = (data as CrawlResult).category || 'unknown';
        stats.byType[type] = (stats.byType[type] || 0) + 1;
      } catch (error) {
        this.errors.push({ file, field: 'parse', message: `Failed to parse JSON: ${error}` });
        stats.invalid++;
      }
    }

    this.saveReport();
    return { valid: this.errors.length === 0, errors: this.errors, stats };
  }

  private validateResource(data: unknown, file: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const r = data as Record<string, unknown>;

    // Required fields
    const requiredFields = ['name', 'description', 'url'];
    for (const field of requiredFields) {
      if (!r[field] || (typeof r[field] === 'string' && (r[field] as string).trim() === '')) {
        errors.push({ file, field, message: `Missing required field: ${field}` });
      }
    }

    // URL validation
    if (r.officialUrl && typeof r.officialUrl === 'string') {
      try {
        new URL(r.officialUrl as string);
      } catch {
        errors.push({ file, field: 'officialUrl', message: `Invalid URL: ${r.officialUrl}` });
      }
    }

    if (r.url && typeof r.url === 'string') {
      try {
        new URL(r.url as string);
      } catch {
        errors.push({ file, field: 'url', message: `Invalid URL: ${r.url}` });
      }
    }

    // Name length
    if (typeof r.name === 'string' && r.name.length < 3) {
      errors.push({ file, field: 'name', message: `Name too short: "${r.name}"` });
    }

    // Description length
    if (typeof r.description === 'string' && r.description.length < 20) {
      errors.push({ file, field: 'description', message: `Description too short (${r.description.length} chars)` });
    }

    return errors;
  }

  private saveReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      totalErrors: this.errors.length,
      errors: this.errors,
    };
    const path = join(SETTINGS.logsDir, `validation-${Date.now()}.json`);
    writeFileSync(path, JSON.stringify(report, null, 2));
    logger.success(`Validation report saved to ${path}`);
  }
}

interface ValidationStats {
  total: number;
  valid: number;
  invalid: number;
  byType: Record<string, number>;
}

async function main() {
  logger.info('Starting data validation...');
  const validator = new DataValidator();
  const result = validator.validateAll();
  
  logger.divider();
  logger.info('Validation Complete:');
  logger.info(`  Total: ${result.stats.total}`);
  logger.info(`  ✅ Valid: ${result.stats.valid}`);
  logger.info(`  ❌ Invalid: ${result.stats.invalid}`);
  if (result.errors.length > 0) {
    logger.info(`  Errors: ${result.errors.length}`);
    for (const err of result.errors.slice(0, 20)) {
      logger.warn(`    ${err.file} > ${err.field}: ${err.message}`);
    }
    if (result.errors.length > 20) {
      logger.warn(`    ... and ${result.errors.length - 20} more errors`);
    }
  }
  logger.info(`Result: ${result.valid ? '✅ ALL VALID' : '❌ HAS ERRORS'}`);
}

main().catch(console.error);
