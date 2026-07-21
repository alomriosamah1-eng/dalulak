# محرك البحث (Search Engine)

## الميزات المدعومة

### 1. Full Text Search
```typescript
interface SearchOptions {
  query: string;
  fields?: ('name' | 'description' | 'features' | 'tags' | 'keywords')[];
  categories?: string[];
  languages?: Language[];
  levels?: DifficultyLevel[];
  pricing?: PricingModel[];
  types?: ResourceType[];
  hasCertificate?: boolean;
  isFree?: boolean;
  limit?: number;
  offset?: number;
}
```

### 2. Fuzzy Search
- Levenshtein distance للكلمات المتشابهة
- تصحيح الأخطاء الإملائية
- دعم العربية بالكامل

### 3. Arabic Normalization
- توحيد أشكال الحروف العربية (أ, إ, آ → ا)
- إزالة التشكيل
- توحيد التاء المربوطة والهاء
- توحيد الألف المقصورة والياء

### 4. Smart Ranking
```typescript
interface RankingScore {
  exactMatch: number;      // 100
  prefixMatch: number;     // 80
  partialMatch: number;    // 60
  fuzzyMatch: number;      // 40
  tagMatch: number;        // 20
  popularity: number;      // 10
}
```

### 5. Auto Complete
```typescript
interface Suggestion {
  text: string;
  type: 'resource' | 'category' | 'tag';
  score: number;
}
```

## خوارزمية البحث

```
1. Normalize query (Arabic normalization)
2. Tokenize query into words
3. Remove stop words (Arabic + English)
4. Expand with synonyms
5. Search across all fields
6. Score each result
7. Apply filters
8. Sort by score
9. Return paginated results
```
