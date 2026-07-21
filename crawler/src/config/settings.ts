export const SETTINGS = {
  // Browser settings
  headless: true,
  viewport: { width: 1920, height: 1080 },
  userAgent: 'Dalylak-Crawler/1.0 (Educational Resource Directory; +https://dalylak.app)',
  
  // Rate limiting
  minDelayMs: 3000,
  maxDelayMs: 7000,
  maxConcurrentPages: 2,
  
  // Page processing
  navigationTimeoutMs: 30000,
  pageContentTimeoutMs: 10000,
  screenshotTimeoutMs: 5000,
  
  // Depth
  maxDepth: 3,
  maxPagesPerSource: 500,
  
  // Resources
  maxScreenshots: 3,
  maxFeatures: 10,
  
  // Retry
  maxRetries: 3,
  retryDelayMs: 5000,
  
  // Quality
  minDescriptionLength: 30,
  minFeaturesCount: 1,
  
  // Storage
  dataDir: './data',
  rawDir: './data/raw',
  processedDir: './data/processed',
  finalDir: './data/final',
  logsDir: './logs',
  screenshotsDir: './screenshots',
};
