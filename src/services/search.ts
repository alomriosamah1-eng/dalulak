import type { Resource } from '../types';

export function searchResources(items: Resource[], query: string): Resource[] {
  const term = query.trim().toLowerCase();
  if (!term) return items;

  return items.filter(
    (item) =>
      (item.name?.toLowerCase().includes(term)) ||
      (item.description?.toLowerCase().includes(term)) ||
      (item.category?.toLowerCase().includes(term)) ||
      (item.categoryId?.toLowerCase().includes(term)) ||
      (item.language?.toLowerCase().includes(term)) ||
      (item.level?.toLowerCase().includes(term)) ||
      item.features?.some((f) => f.toLowerCase().includes(term)) ||
      item.tags?.some((t) => t.toLowerCase().includes(term)) ||
      item.keywords?.some((k) => k.toLowerCase().includes(term))
  );
}
