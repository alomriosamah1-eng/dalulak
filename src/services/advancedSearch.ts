import type { Resource } from '../types';
import type { SearchOptions, SearchResult } from '../types';
import {
  normalizeArabic,
  tokenize,
  expandWithSynonyms,
} from './searchService';

type ResourceSearchable = Pick<Resource,
  'id' | 'name' | 'nameAr' | 'description' | 'features' | 'tags' | 'keywords'
  | 'categoryId' | 'language' | 'level' | 'pricing' | 'type'
  | 'hasFreeCertificate' | 'hasFreeTier' | 'popularityScore'>;

function getSearchableText(resource: ResourceSearchable): string {
  return [
    resource.name,
    resource.nameAr || '',
    resource.description,
    ...(resource.features || []),
    ...(resource.tags || []),
    ...(resource.keywords || []),
    resource.categoryId,
  ].join(' ');
}

function scoreResource(resource: ResourceSearchable, words: string[], expandedWords: string[]): number {
  let score = 0;
  const searchable = getSearchableText(resource);
  const normalized = normalizeArabic(searchable);

  for (const word of words) {
    const normalizedWord = normalizeArabic(word);

    // Exact match in name
    if (normalizeArabic(resource.name).includes(normalizedWord)) {
      score += 100;
    }
    if (resource.nameAr && normalizeArabic(resource.nameAr).includes(normalizedWord)) {
      score += 100;
    }

    // Exact match in description
    if (normalizeArabic(resource.description).includes(normalizedWord)) {
      score += 50;
    }

    // Match in features
    for (const feature of resource.features) {
      if (normalizeArabic(feature).includes(normalizedWord)) {
        score += 30;
        break;
      }
    }

    // Match in tags/keywords
    for (const tag of [...resource.tags, ...resource.keywords]) {
      if (normalizeArabic(tag).includes(normalizedWord)) {
        score += 40;
        break;
      }
    }

    // Category match
    if (normalizeArabic(resource.categoryId).includes(normalizedWord)) {
      score += 25;
    }
  }

  // Fuzzy bonus for partially matching words
  for (const expanded of expandedWords) {
    const normalizedExpanded = normalizeArabic(expanded);
    if (normalized.includes(normalizedExpanded)) {
      score += 20;
    }
  }

  // Popularity bonus
  score += (resource.popularityScore || 0) * 0.5;

  return score;
}

function applyFilters(resource: ResourceSearchable, options: SearchOptions): boolean {
  if (options.categories && options.categories.length > 0) {
    if (!options.categories.includes(resource.categoryId)) {
      return false;
    }
  }
  if (options.languages && options.languages.length > 0) {
    if (!options.languages.includes(resource.language)) {
      return false;
    }
  }
  if (options.levels && options.levels.length > 0) {
    if (!options.levels.includes(resource.level)) {
      return false;
    }
  }
  if (options.pricing && options.pricing.length > 0) {
    if (!options.pricing.includes(resource.pricing)) {
      return false;
    }
  }
  if (options.types && options.types.length > 0) {
    if (!options.types.includes(resource.type)) {
      return false;
    }
  }
  if (options.hasFreeCertificate !== undefined) {
    if (resource.hasFreeCertificate !== options.hasFreeCertificate) {
      return false;
    }
  }
  if (options.isFree !== undefined) {
    const freeModels = ['free', 'freemium', 'donation'] as const;
    const isFree = freeModels.includes(resource.pricing as typeof freeModels[number]);
    if (isFree !== options.isFree) return false;
  }
  return true;
}

export function searchResources(
  resources: ResourceSearchable[],
  options: SearchOptions
): SearchResult<ResourceSearchable> {
  const startTime = performance.now();

  if (!options.query || options.query.trim() === '') {
    const filtered = options.categories || options.languages || options.levels || options.pricing || options.types
      ? resources.filter(r => applyFilters(r, options))
      : resources;

    return {
      items: filtered.slice(options.offset || 0, (options.offset || 0) + (options.limit || 20)),
      total: filtered.length,
      query: '',
      time: performance.now() - startTime,
      suggestions: [],
    };
  }

  const words = tokenize(options.query);
  const expandedWords = options.useSynonyms !== false
    ? words.flatMap(expandWithSynonyms)
    : words;

  // Filter first
  let candidates = resources.filter(r => applyFilters(r, options));

  // Score and sort
  const scored = candidates.map(resource => ({
    resource,
    score: scoreResource(resource, words, expandedWords),
  }));

  const eligible = scored.filter(s => s.score > 0);
  eligible.sort((a, b) => b.score - a.score);

  const total = eligible.length;
  const start = options.offset || 0;
  const limit = options.limit || 20;
  const items = eligible.slice(start, start + limit).map(s => s.resource);

  // Get suggestions
  const suggestions = getSuggestions(words, resources, items);

  return {
    items,
    total,
    query: options.query,
    time: performance.now() - startTime,
    suggestions,
  };
}

function getSuggestions(words: string[], _allResources: ResourceSearchable[], currentResults: ResourceSearchable[]): string[] {
  const suggestions = new Set<string>();

  // Suggest tags from results
  for (const r of currentResults) {
    for (const tag of r.tags) {
      if (words.every(w => !tag.toLowerCase().includes(w))) {
        suggestions.add(tag);
      }
    }
  }

  // Suggest category names
  for (const r of currentResults) {
    const catParts = r.categoryId.split('-').map(p => p.trim());
    for (const part of catParts) {
      suggestions.add(part);
    }
  }

  return [...suggestions].slice(0, 5);
}
