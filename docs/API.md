# API Design

## Internal API (Services)

### searchService
```typescript
searchResources(query: string, options?: SearchOptions): SearchResult<Resource>
```
- Full text search
- Arabic normalization
- Fuzzy matching
- Filter support
- Pagination

### storageService
```typescript
saveToCache(key: string, data: unknown): Promise<void>
loadFromCache(key: string): Promise<unknown | null>
clearCache(): Promise<void>
```
- IndexedDB wrapper
- Offline data access

### exportService
```typescript
exportToJson(resources: Resource[]): { data: string; filename: string }
exportToCSV(resources: Resource[]): { data: string; filename: string }
importFromJson(json: string): Resource[]
```

## Future REST API (Phase 3)

```typescript
// Base URL: /api/v1

// GET /resources
query params: {
  category, language, level, pricing, type,
  search, tags, page, limit, sort
}

// GET /resources/:id
// GET /categories
// GET /categories/:id/resources
// GET /search?q=&category=&language=
// GET /stats
```

## Data Flow (Crawler → App)

```
Crawler (Playwright)
    ↓ JSON files
Data Cleaner
    ↓ Processed JSON
TypeScript Data (src/data/*.ts)
    ↓ Import
Zustand Store / React App
    ↓
User Interface
```
