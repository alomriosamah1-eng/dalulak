import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { searchResources } from '../services/search';
import { allData } from '../data';
import type { Resource, SectionId } from '../types';

export function useSearch(section: SectionId) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const results = useMemo<Resource[]>(() => {
    if (section === 'dashboard' || section === 'about') return [];
    const items = allData[section as keyof typeof allData] || [];
    return searchResources(items, debouncedQuery);
  }, [section, debouncedQuery]);

  return { query, setQuery, results, isSearching: debouncedQuery.length > 0 };
}
