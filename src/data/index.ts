import { learningData } from './learning';
import { youtubeData } from './youtube';
import { workData } from './work';
import { toolsData } from './tools';
import { testsData } from './tests';
import { aiData } from './ai';
import { designData } from './design';
import { businessData } from './business';
import { productivityData } from './productivity';
import { marketingData } from './marketing';
import { freelancingData } from './freelancing';
import { communitiesData } from './communities';
import { podcastsData } from './podcasts';
import { newslettersData } from './newsletters';
import { booksData } from './books';
import { openSourceData } from './open-source';
import type { Resource } from '../types';

export const allData: Record<string, Resource[]> = {
  learning: learningData,
  youtube: youtubeData,
  work: workData,
  tools: toolsData,
  tests: testsData,
  ai: aiData,
  design: designData,
  business: businessData,
  productivity: productivityData,
  marketing: marketingData,
  freelancing: freelancingData,
  communities: communitiesData,
  podcasts: podcastsData,
  newsletters: newslettersData,
  books: booksData,
  'open-source': openSourceData,
};

export const sectionCounts: Record<string, number> = {
  learning: learningData.length,
  youtube: youtubeData.length,
  work: workData.length,
  tools: toolsData.length,
  tests: testsData.length,
  ai: aiData.length,
  design: designData.length,
  business: businessData.length,
  productivity: productivityData.length,
  marketing: marketingData.length,
  freelancing: freelancingData.length,
  communities: communitiesData.length,
  podcasts: podcastsData.length,
  newsletters: newslettersData.length,
  books: booksData.length,
  'open-source': openSourceData.length,
};

export const totalResources = Object.values(sectionCounts).reduce((a, b) => a + b, 0);

export {
  learningData,
  youtubeData,
  workData,
  toolsData,
  testsData,
  aiData,
  designData,
  businessData,
  productivityData,
  marketingData,
  freelancingData,
  communitiesData,
  podcastsData,
  newslettersData,
  booksData,
  openSourceData,
};
