import { chromium, Browser, Page } from 'playwright';
import { Queue } from './Queue';
import { RateLimiter } from './RateLimiter';
import { RobotsParser } from './RobotsParser';
import { SETTINGS } from '../config/settings';
import { SOURCES, CrawlSource } from '../config/sources';
import { logger } from '../utils/logger';
import { extractDomain, normalizeUrl, delay, randomBetween } from '../utils/helpers';
import { JsonStorage } from '../storage/JsonStorage';

export interface CrawlResult {
  id: string;
  sourceId: string;
  url: string;
  title: string;
  description: string;
  logoUrl?: string;
  screenshots: string[];
  features: string[];
  tags: string[];
  category: string;
  language: string;
  links: string[];
  status: 'active' | 'broken' | 'unknown';
  quality: number;
  crawledAt: string;
  content?: string;
}

export const crawlStatus = {
  started: false,
  currentSource: '',
  pagesProcessed: 0,
  totalPages: 0,
  errors: 0,
  success: 0,
  startTime: 0,
};

export class Crawler {
  private browser: Browser | null = null;
  private queue: Queue;
  private rateLimiter: RateLimiter;
  private robotsParser: RobotsParser;
  private storage: JsonStorage;

  constructor() {
    this.queue = new Queue('./data/queue-state.json');
    this.rateLimiter = new RateLimiter(SETTINGS.minDelayMs, SETTINGS.maxDelayMs);
    this.robotsParser = new RobotsParser();
    this.storage = new JsonStorage();
  }

  async initialize() {
    logger.info('Initializing Playwright browser...');
    this.browser = await chromium.launch({
      headless: SETTINGS.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
    logger.success('Browser initialized');
  }

  async run(sourceId?: string) {
    if (!this.browser) await this.initialize();

    crawlStatus.started = true;
    crawlStatus.startTime = Date.now();

    const sources = sourceId
      ? SOURCES.filter(s => s.id === sourceId)
      : SOURCES;

    for (const source of sources) {
      await this.crawlSource(source);
    }

    await this.finalize();
  }

  private async crawlSource(source: CrawlSource) {
    crawlStatus.currentSource = source.name;
    logger.divider();
    logger.info(`Starting crawl: ${source.name} (${source.url})`);

    const domain = extractDomain(source.url);
    const robotsRules = await this.robotsParser.fetch(domain);
    const delayMs = Math.max(robotsRules.crawlDelay, SETTINGS.minDelayMs);

    if (!this.robotsParser.isAllowed(source.url, robotsRules)) {
      logger.warn(`Skipping ${source.url} - blocked by robots.txt`);
      return;
    }

    this.queue.enqueue(source.url, source.id, 0, source.priority);
    crawlStatus.totalPages = this.queue.size;

    let consecutiveEmptyPages = 0;

    while (this.queue.size > 0 && crawlStatus.pagesProcessed < SETTINGS.maxPagesPerSource) {
      const item = this.queue.dequeue();
      if (!item) break;

      if (item.depth > SETTINGS.maxDepth) {
        this.queue.markVisited(item.url);
        continue;
      }

      if (!this.robotsParser.isAllowed(item.url, robotsRules)) {
        logger.debug(`Skipping ${item.url} - blocked by robots.txt`);
        this.queue.markVisited(item.url);
        continue;
      }

      await this.rateLimiter.wait(domain);
      const result = await this.processPage(item.url, source, item.depth);

      if (result) {
        this.storage.saveRaw(result, source.id);
        crawlStatus.success++;
        consecutiveEmptyPages = 0;
      } else {
        crawlStatus.errors++;
        consecutiveEmptyPages++;
      }

      this.queue.markVisited(item.url);
      crawlStatus.pagesProcessed++;

      const stats = this.queue.getStats();
      logger.progress(crawlStatus.pagesProcessed, SETTINGS.maxPagesPerSource, source.name);

      if (consecutiveEmptyPages > 10) {
        logger.warn('Too many consecutive empty pages, might be blocked');
        await delay(30000);
      }
    }

    logger.success(`Finished: ${source.name} - ${crawlStatus.success} pages`);
  }

  private async processPage(url: string, source: CrawlSource, depth: number): Promise<CrawlResult | null> {
    if (!this.browser) return null;

    const context = await this.browser.newContext({
      viewport: SETTINGS.viewport,
      userAgent: SETTINGS.userAgent,
      locale: 'ar-EG',
      timezoneId: 'Asia/Riyadh',
    });

    const page = await context.newPage();

    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: SETTINGS.navigationTimeoutMs,
      });

      await delay(randomBetween(1000, 2000));

      const content = await page.content();
      const title = await page.title();
      const description = await this.extractDescription(page);
      const result: CrawlResult = {
        id: `${source.id}-${crawlStatus.pagesProcessed}`,
        sourceId: source.id,
        url: normalizeUrl(url),
        title: title || source.name,
        description: description || '',
        features: await this.extractFeatures(page),
        tags: await this.extractTags(page),
        category: source.primaryCategory,
        language: 'auto',
        links: await this.extractLinks(page, source, depth),
        screenshots: [],
        status: 'active',
        quality: 0,
        crawledAt: new Date().toISOString(),
      };

      result.language = await this.detectLanguage(result);
      result.quality = this.calculateQuality(result);
      result.logoUrl = await this.extractLogo(page);

      return result;
    } catch (error) {
      logger.error(`Error processing ${url}:`, error);
      return null;
    } finally {
      await context.close();
    }
  }

  private async extractDescription(page: Page): Promise<string> {
    const selectors = [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
      'p.description',
      '.description',
      '#description',
    ];
    for (const selector of selectors) {
      try {
        const el = await page.locator(selector).first();
        if (await el.count() > 0) {
          const content = await el.getAttribute('content') || await el.textContent();
          if (content && content.length > 10) return content.trim();
        }
      } catch {
        continue;
      }
    }
    return '';
  }

  private async extractLogo(page: Page): Promise<string | undefined> {
    const selectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      'link[rel="icon"]',
      'link[rel="apple-touch-icon"]',
      'img[alt*="logo" i]',
      '.logo img',
      '#logo img',
      'header img:first-child',
    ];
    for (const selector of selectors) {
      try {
        const el = await page.locator(selector).first();
        if (await el.count() > 0) {
          const src = await el.getAttribute('content') || await el.getAttribute('href') || await el.getAttribute('src');
          if (src) return new URL(src, page.url()).href;
        }
      } catch {
        continue;
      }
    }
    return undefined;
  }

  private async extractFeatures(page: Page): Promise<string[]> {
    const features: string[] = [];
    const selectors = [
      'ul.features li',
      '.features li',
      '.feature-list li',
      '[class*="feature"] li',
      'ul.benefits li',
      '.benefits li',
    ];
    for (const selector of selectors) {
      try {
        const items = await page.locator(selector).all();
        for (const item of items.slice(0, SETTINGS.maxFeatures)) {
          const text = (await item.textContent())?.trim();
          if (text && text.length > 5 && !features.includes(text)) {
            features.push(text);
          }
        }
      } catch {
        continue;
      }
    }
    return features.slice(0, SETTINGS.maxFeatures);
  }

  private async extractTags(page: Page): Promise<string[]> {
    const tags: string[] = [];
    const selectors = [
      'meta[name="keywords"]',
      '[class*="tag"]',
      '[class*="category"]',
      '.tags a',
    ];
    for (const selector of selectors) {
      try {
        const el = await page.locator(selector).first();
        if (await el.count() > 0) {
          const content = await el.getAttribute('content') || await el.textContent();
          if (content) {
            const extracted = content.split(',').map(t => t.trim()).filter(Boolean);
            tags.push(...extracted);
          }
        }
      } catch {
        continue;
      }
    }
    return [...new Set(tags)];
  }

  private async extractLinks(page: Page, source: CrawlSource, depth: number): Promise<string[]> {
    const links: string[] = [];
    try {
      const allLinks = await page.locator('a[href]').all();
      for (const link of allLinks.slice(0, 50)) {
        try {
          const href = await link.getAttribute('href');
          if (!href) continue;
          
          const fullUrl = normalizeUrl(new URL(href, page.url()).href);
          const linkDomain = extractDomain(fullUrl);
          const sourceDomain = extractDomain(source.url);

          if (linkDomain !== sourceDomain && depth < SETTINGS.maxDepth) {
            this.queue.enqueue(fullUrl, source.id, depth + 1, source.priority - 1);
          }
          links.push(fullUrl);
        } catch {
          continue;
        }
      }
    } catch {
      // ignore
    }
    return links;
  }

  private async detectLanguage(result: CrawlResult): Promise<string> {
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
    if (arabicPattern.test(result.title) || arabicPattern.test(result.description)) {
      return 'ar';
    }
    return 'en';
  }

  private calculateQuality(result: CrawlResult): number {
    let score = 0;
    if (result.description.length > 30) score += 25;
    if (result.description.length > 100) score += 15;
    if (result.features.length > 0) score += 20;
    if (result.features.length > 5) score += 10;
    if (result.tags.length > 0) score += 10;
    if (result.links.length > 0) score += 5;
    if (result.logoUrl) score += 10;
    if (result.title.length > 5) score += 5;
    return Math.min(score, 100);
  }

  private async finalize() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }

    const elapsed = ((Date.now() - crawlStatus.startTime) / 1000).toFixed(1);
    logger.divider();
    logger.info(`Crawl complete: ${crawlStatus.success} success, ${crawlStatus.errors} errors in ${elapsed}s`);
    logger.info('Results saved to data/ directory');
  }
}
