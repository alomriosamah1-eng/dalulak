# نظام الزحف بـ Playwright

## الهيكل

```
crawler/
├── src/
│   ├── index.ts                    # نقطة الدخول الرئيسية
│   ├── config/
│   │   ├── sources.ts              # قائمة المصادر المستهدفة
│   │   ├── categories.ts           # تعريف التصنيفات
│   │   └── settings.ts             # إعدادات الزحف
│   ├── core/
│   │   ├── Crawler.ts              # محرك الزحف الأساسي
│   │   ├── Queue.ts                # نظام قائمة الانتظار
│   │   ├── RateLimiter.ts          # التحكم بمعدل الطلبات
│   │   └── RobotsParser.ts         # محلل robots.txt
│   ├── extractors/
│   │   ├── MetadataExtractor.ts    # مستخرج البيانات الوصفية
│   │   ├── ContentExtractor.ts     # مستخرج المحتوى
│   │   ├── MediaExtractor.ts       # مستخرج الوسائط
│   │   └── LinkExtractor.ts        # مستخرج الروابط
│   ├── classifiers/
│   │   ├── CategoryClassifier.ts   # تصنيف المحتوى
│   │   ├── LanguageDetector.ts     # كشف اللغة
│   │   └── QualityScorer.ts        # تقييم الجودة
│   ├── validators/
│   │   ├── LinkChecker.ts          # فحص الروابط
│   │   └── DataValidator.ts        # التحقق من صحة البيانات
│   ├── storage/
│   │   └── JsonStorage.ts          # تخزين النتائج
│   └── utils/
│       ├── logger.ts               # نظام التسجيل
│       └── helpers.ts              # دوال مساعدة
├── data/
│   ├── raw/                        # البيانات الخام
│   ├── processed/                  # البيانات المنظفة
│   └── final/                      # البيانات النهائية
├── logs/                           # سجلات التشغيل
├── screenshots/                    # لقطات الشاشة
├── package.json
├── tsconfig.json
└── .env
```

## المكونات الأساسية

### 1. محرك الزحف (Crawler)
```typescript
class Crawler {
  private browser: Browser;
  private queue: Queue;
  private rateLimiter: RateLimiter;
  
  async crawl(source: CrawlSource): Promise<CrawlResult[]>;
  async processPage(url: string): Promise<ExtractedData>;
  async validateResult(result: CrawlResult): Promise<boolean>;
}
```

### 2. نظام قائمة الانتظار (Queue)
```typescript
class Queue {
  private urls: string[];
  private visited: Set<string>;
  private priorities: Map<string, number>;
  
  enqueue(url: string, priority: number): void;
  dequeue(): string | null;
  markVisited(url: string): void;
  hasBeenVisited(url: string): boolean;
}
```

### 3. مستخرج البيانات (Extractors)
```typescript
interface MetadataExtractor {
  extractTitle(page: Page): Promise<string>;
  extractDescription(page: Page): Promise<string>;
  extractOpenGraph(page: Page): Promise<OGData>;
  extractJSONLD(page: Page): Promise<JSONLDData>;
  extractMetaTags(page: Page): Promise<MetaData>;
}
```

### 4. المصنفات (Classifiers)
```typescript
interface CategoryClassifier {
  classify(html: string, metadata: Metadata): CategoryResult;
  suggestTags(content: string): string[];
  detectCategory(url: string, title: string): string;
}
```

## سير العمل

```
1. تهيئة المتصفح (Browser Context)
2. جلب المصدر من قائمة الانتظار
3. فتح الصفحة
4. استخراج البيانات الوصفية
5. استخراج المحتوى
6. استخراج الوسائط (شعار، لقطات)
7. استخراج الروابط
8. تصنيف المحتوى
9. التحقق من صحة البيانات
10. إزالة التكرار
11. تخزين النتيجة
12. إضافة روابط جديدة للقائمة
13. تكرار حتى نفاد القائمة
```

## أوامر التشغيل

```bash
# تثبيت الاعتماديات
cd crawler && npm install

# تشغيل الزحف
npm run crawl

# تشغيل الزحف لمصدر محدد
npm run crawl -- --source=github-awesome

# فحص الروابط المعطلة فقط
npm run check-links

# تصدير البيانات
npm run export
```
