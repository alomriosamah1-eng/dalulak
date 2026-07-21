# خطة جودة البيانات (Data Quality)

## معايير الجودة

### 1. الاكتمال (Completeness)
كل مورد يجب أن يستوفي الحد الأدنى:

| الحقل | مطلوب؟ | الحد الأدنى |
|-------|--------|-------------|
| id | ✅ | UUID valid |
| name | ✅ | 3 أحرف على الأقل |
| description | ✅ | 50 حرفاً على الأقل |
| officialUrl | ✅ | رابط صالح |
| categoryId | ✅ | موجود في التصنيفات |
| language | ✅ | رمز لغة صحيح |
| level | ✅ | قيمة من DifficultyLevel |
| pricing | ✅ | قيمة من PricingModel |
| features | ✅ | ميزة واحدة على الأقل |

### 2. الصحة (Validity)

```
URL Validation
├── HTTP Status 200 (active)
├── HTTP Status 301/302 (redirect → follow)
├── No dead links (404/410)
├── HTTPS only (no HTTP plain)
└── No broken SSL certificates
```

### 3. التفرد (Uniqueness)

```
Deduplication Strategy
├── Exact URL match → merge
├── Domain + name fuzzy match → merge with confirmation
├── Same name (different URL) → keep both if different platforms
└── Same platform (different URL) → prefer official URL
```

### 4. التوقيت (Timeliness)

```
Refresh Schedule
├── Free resources → every 30 days
├── Paid resources → every 60 days
├── AI/ML tools → every 14 days (fast-changing)
├── Educational platforms → every 30 days
└── GitHub repos → every 14 days
```

## أدوات التحقق

### Link Checker
```bash
npm run check-links  # فحص جميع الروابط
```

### Data Validator
```bash
npm run validate      # التحقق من صحة البيانات
```

### Stats
```bash
npm run stats         # إحصائيات البيانات
```

## تقرير الجودة

```typescript
interface QualityReport {
  totalResources: number;
  validResources: number;
  brokenLinks: number;
  missingFields: number;
  duplicates: number;
  averageQuality: number;
  byCategory: Record<string, number>;
  byLanguage: Record<string, number>;
  byPricing: Record<string, number>;
}
```
