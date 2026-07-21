import { crawlStatus } from './Crawler';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { logger } from '../utils/logger';

interface QueueItem {
  url: string;
  sourceId: string;
  depth: number;
  priority: number;
  addedAt: string;
}

export class Queue {
  private items: QueueItem[] = [];
  private visited = new Set<string>();
  private inProgress = new Set<string>();
  private persistPath: string | null = null;

  constructor(persistPath?: string) {
    this.persistPath = persistPath || null;
    if (persistPath && existsSync(persistPath)) {
      this.load(persistPath);
    }
  }

  enqueue(url: string, sourceId: string, depth: number = 0, priority: number = 5) {
    const normalized = url.toLowerCase().trim();
    if (this.visited.has(normalized) || this.inProgress.has(normalized)) {
      return;
    }
    const item: QueueItem = {
      url: normalized,
      sourceId,
      depth,
      priority,
      addedAt: new Date().toISOString(),
    };
    this.items.push(item);
    this.sort();
    this.persist();
  }

  dequeue(): QueueItem | null {
    const item = this.items.shift() || null;
    if (item) {
      this.inProgress.add(item.url.toLowerCase());
    }
    return item;
  }

  markVisited(url: string) {
    const normalized = url.toLowerCase();
    this.visited.add(normalized);
    this.inProgress.delete(normalized);
    this.persist();
  }

  hasBeenVisited(url: string): boolean {
    return this.visited.has(url.toLowerCase());
  }

  get size(): number {
    return this.items.length;
  }

  get visitedCount(): number {
    return this.visited.size;
  }

  private sort() {
    this.items.sort((a, b) => b.priority - a.priority);
  }

  private persist() {
    if (!this.persistPath) return;
    try {
      const data = {
        items: this.items,
        visited: Array.from(this.visited),
        inProgress: Array.from(this.inProgress),
        timestamp: new Date().toISOString(),
      };
      writeFileSync(this.persistPath, JSON.stringify(data, null, 2));
    } catch (error) {
      logger.error('Failed to persist queue:', error);
    }
  }

  private load(path: string) {
    try {
      const data = JSON.parse(readFileSync(path, 'utf-8'));
      this.items = data.items || [];
      this.visited = new Set(data.visited || []);
      this.inProgress = new Set(data.inProgress || []);
      logger.info(`Loaded queue: ${this.items.length} pending, ${this.visited.size} visited`);
    } catch (error) {
      logger.warn('Could not load queue from file:', error);
    }
  }

  getStats() {
    return {
      pending: this.size,
      visited: this.visitedCount,
      inProgress: this.inProgress.size,
      total: this.size + this.visitedCount + this.inProgress.size,
    };
  }
}
