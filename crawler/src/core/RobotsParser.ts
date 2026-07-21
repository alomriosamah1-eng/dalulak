import { logger } from '../utils/logger';

interface RobotsRules {
  allowed: string[];
  disallowed: string[];
  crawlDelay: number;
  sitemaps: string[];
}

export class RobotsParser {
  private cache = new Map<string, RobotsRules>();
  private fetched = new Set<string>();

  private defaultRules(): RobotsRules {
    return { allowed: ['/'], disallowed: [], crawlDelay: 5000, sitemaps: [] };
  }

  async fetch(domain: string): Promise<RobotsRules> {
    if (this.fetched.has(domain)) {
      return this.cache.get(domain) || this.defaultRules();
    }

    try {
      const url = `https://${domain}/robots.txt`;
      logger.info(`Fetching robots.txt from ${url}`);
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      
      if (!response.ok) {
        logger.warn(`No robots.txt for ${domain} (${response.status})`);
        this.fetched.add(domain);
        return this.defaultRules();
      }

      const text = await response.text();
      const rules = this.parse(text);
      this.cache.set(domain, rules);
      this.fetched.add(domain);
      logger.info(`Parsed robots.txt for ${domain}: ${rules.allowed.length} allowed, ${rules.disallowed.length} disallowed`);
      return rules;
    } catch (error) {
      logger.warn(`Failed to fetch robots.txt for ${domain}:`, error);
      this.fetched.add(domain);
      return this.defaultRules();
    }
  }

  private parse(text: string): RobotsRules {
    const rules: RobotsRules = { allowed: [], disallowed: [], crawlDelay: 5000, sitemaps: [] };
    let currentAgent = '*';

    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const [key, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').trim();
      const lowerKey = key.trim().toLowerCase();

      if (lowerKey === 'user-agent') {
        currentAgent = value;
      } else if (currentAgent === '*' || currentAgent === 'Dalylak-Crawler') {
        if (lowerKey === 'allow') rules.allowed.push(value);
        else if (lowerKey === 'disallow') rules.disallowed.push(value);
        else if (lowerKey === 'crawl-delay') rules.crawlDelay = parseInt(value) * 1000 || 5000;
        else if (lowerKey === 'sitemap') rules.sitemaps.push(value);
      }
    }

    return rules;
  }

  isAllowed(url: string, rules: RobotsRules): boolean {
    const path = new URL(url).pathname;
    
    for (const disallow of rules.disallowed) {
      if (disallow === '/' || path.startsWith(disallow)) {
        for (const allow of rules.allowed) {
          if (path.startsWith(allow)) return true;
        }
        return false;
      }
    }
    return true;
  }

  getCrawlDelay(domain: string): number {
    return this.cache.get(domain)?.crawlDelay || 5000;
  }
}
