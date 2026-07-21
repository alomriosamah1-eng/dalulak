// ===== Core Types =====

export type ResourceType = string;

export type ContentFormat =
  | 'video'
  | 'text'
  | 'interactive'
  | 'audio'
  | 'pdf'
  | 'certificate'
  | 'live'
  | 'project'
  | 'podcasts'
  ;

export type Language =
  | 'ar'
  | 'en'
  | 'fr'
  | 'es'
  | 'de'
  | 'tr'
  | 'ur'
  | 'pt'
  | 'ru'
  | 'zh'
  | 'multi'
  ;

export type DifficultyLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'all'
  ;

export type PricingModel =
  | 'free'
  | 'freemium'
  | 'paid'
  | 'subscription'
  | 'donation'
  ;

export type ResourceStatus =
  | 'active'
  | 'inactive'
  | 'broken'
  | 'unknown'
  ;

export type DataSource =
  | 'manual'
  | 'crawler'
  | 'community'
  | 'api'
  ;

export interface SocialLinks {
  twitter?: string;
  youtube?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
  telegram?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

// ===== Resource Entity (Backward Compatible) =====

export interface Resource {
  // === Core ID ===
  id: string | number;

  // === Legacy fields (from v1) ===
  logo?: string;
  usage?: string;
  conditions?: string;
  link?: string;
  category?: string;
  isFree?: boolean;
  price?: string;
  commission?: string;
  hasQuiz?: boolean;

  // === New fields (v2+) ===
  slug?: string;
  name: string;
  nameAr?: string;
  description: string;
  summary?: string;

  // Classification
  categoryId?: string;
  categoryPath?: string[];
  tags?: string[];
  keywords?: string[];

  // Content
  type?: ResourceType;
  format?: ContentFormat[];
  type_label?: string;

  // Language
  language: string;
  languagesAvailable?: string[];
  hasArabicContent?: boolean;

  // Level
  level: string;

  // Pricing
  pricing?: string;
  priceRange?: string;
  hasFreeTier?: boolean;
  hasFreeCertificate?: boolean;

  // Links
  officialUrl?: string;
  alternativeUrls?: string[];
  socialLinks?: SocialLinks;
  communityLinks?: string[];

  // Media
  logoUrl?: string;
  coverImageUrl?: string;
  screenshots?: string[];
  faviconUrl?: string;

  // Rating
  rating?: number;
  reviewCount?: number;
  popularityScore?: number;

  // Features
  features: string[];
  pros?: string[];
  cons?: string[];
  alternatives?: string[];

  // Status
  status?: string;
  lastChecked?: string;
  lastUpdated?: string;
  isVerified?: boolean;

  // Source
  source?: string;
  sourceUrl?: string;
  dataQuality?: number;

  // Stats
  createdAt?: string;
  updatedAt?: string;
  viewCount?: number;
  saveCount?: number;
}

// ===== Supporting Entities =====

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  parentId: string | null;
  children: string[];
  slug: string;
  icon: string;
  color: string;
  order: number;
  resourceCount: number;
  level: number;
  path: string[];
  keywords: string[];
}

export interface Tag {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  resourceCount: number;
}

export interface CrawlSource {
  id: string;
  name: string;
  url: string;
  category: string;
  type: 'awesome-list' | 'directory' | 'curated-list' | 'blog' | 'documentation' | 'platform';
  crawlStrategy: 'scrape' | 'api' | 'rss';
  lastCrawled: string | null;
  crawlFrequency: number;
  isActive: boolean;
  respectRobotsTxt: boolean;
}

// ===== App-specific types (existing) =====

export type SectionId =
  | 'dashboard'
  | 'learning'
  | 'youtube'
  | 'work'
  | 'tools'
  | 'tests'
  | 'ai'
  | 'about'
  | 'favorites'
  | 'design'
  | 'business'
  | 'productivity'
  | 'marketing'
  | 'freelancing'
  | 'communities'
  | 'podcasts'
  | 'newsletters'
  | 'books'
  | 'open-source'
  | 'settings'
  ;

export interface SectionConfig {
  id: SectionId;
  label: string;
  icon: string;
  color: string;
  categoryIds?: string[];
}

export interface FavoriteItem {
  id: string | number;
  name: string;
  section: SectionId;
  category?: string;
  officialUrl?: string;
  logoUrl?: string;
}

export interface StatItem {
  label: string;
  count: number;
  icon: string;
  color: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

// ===== Search Types =====

export interface SearchOptions {
  query: string;
  fields?: ('name' | 'description' | 'features' | 'tags' | 'keywords' | 'category')[];
  categories?: string[];
  languages?: string[];
  levels?: string[];
  pricing?: string[];
  types?: string[];
  hasFreeCertificate?: boolean;
  isFree?: boolean;
  limit?: number;
  offset?: number;
  fuzzyThreshold?: number;
  useSynonyms?: boolean;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  time: number;
  suggestions: string[];
}
