import { randomBetween } from '../utils/helpers';
import { logger } from '../utils/logger';

export class RateLimiter {
  private lastRequestTime = 0;
  private minDelay: number;
  private maxDelay: number;
  private domainDelays = new Map<string, number>();
  private consecutiveErrors = 0;

  constructor(minDelayMs: number = 3000, maxDelayMs: number = 7000) {
    this.minDelay = minDelayMs;
    this.maxDelay = maxDelayMs;
  }

  async wait(domain?: string) {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    
    let delay = randomBetween(this.minDelay, this.maxDelay);
    
    if (domain && this.domainDelays.has(domain)) {
      delay = Math.max(delay, this.domainDelays.get(domain)!);
    }

    if (this.consecutiveErrors > 0) {
      delay *= Math.min(this.consecutiveErrors, 5);
    }

    const waitTime = Math.max(0, delay - elapsed);
    
    if (waitTime > 0) {
      logger.debug(`Rate limit: waiting ${waitTime}ms${domain ? ` for ${domain}` : ''}`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.lastRequestTime = Date.now();
  }

  recordError(domain: string) {
    this.consecutiveErrors++;
    const currentDelay = this.domainDelays.get(domain) || this.minDelay;
    this.domainDelays.set(domain, Math.min(currentDelay * 2, 60000));
    logger.warn(`Rate limiter: ${domain} delay increased to ${this.domainDelays.get(domain)}ms`);
  }

  recordSuccess(domain: string) {
    this.consecutiveErrors = 0;
    const currentDelay = this.domainDelays.get(domain);
    if (currentDelay && currentDelay > this.minDelay) {
      this.domainDelays.set(domain, Math.max(currentDelay * 0.8, this.minDelay));
    }
  }

  reset() {
    this.consecutiveErrors = 0;
    this.lastRequestTime = 0;
    this.domainDelays.clear();
  }
}
