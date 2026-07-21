# نموذج البيانات (Data Model)

## Core Entity: Resource

```typescript
interface Resource {
  // === المعرفات ===
  id: string;                    // UUID v4
  slug: string;                  // URL-friendly name (e.g., "coursera")
  
  // === المعلومات الأساسية ===
  name: string;                  // اسم المورد
  nameAr?: string;               // الاسم بالعربية (إذا كان أجنبياً)
  description: string;           // وصف المورد (2-3 جمل)
  summary: string;               // تلخيص قصير (جملة واحدة)
  
  // === التصنيف ===
  categoryId: string;            // المعرف التصنيفي الرئيسي
  categoryPath: string[];        // مسار التصنيف الكامل
  tags: string[];                // وسوم (مفتاحية)
  keywords: string[];            // كلمات مفتاحية للبحث
  
  // === المحتوى ===
  type: ResourceType;            // platform | course | channel | tool | book | podcast | newsletter | blog | github | paper
  format: ContentFormat[];       // video | text | interactive | audio | pdf | certificate
  
  // === اللغة ===
  language: Language;            // اللغة الأساسية
  languagesAvailable: Language[];// اللغات المتوفرة
  hasArabicContent: boolean;     // هل يوجد محتوى عربي؟
  
  // === المستوى ===
  level: DifficultyLevel;        // beginner | intermediate | advanced | all
  
  // === السعر ===
  pricing: PricingModel;         // free | freemium | paid | subscription
  priceRange?: string;           // نطاق السعر إن كان مدفوعاً
  hasFreeTier: boolean;          // هل يوجد خيار مجاني؟
  hasFreeCertificate: boolean;   // شهادة مجانية؟
  
  // === الروابط ===
  officialUrl: string;           // الرابط الرسمي
  alternativeUrls: string[];     // روابط بديلة
  socialLinks: SocialLinks;      // روابط التواصل
  communityLinks: string[];      // روابط المجتمع
  
  // === الوسائط ===
  logoUrl: string;               // رابط الشعار
  coverImageUrl?: string;        // صورة الغلاف
  screenshots: string[];         // لقطات شاشة
  faviconUrl?: string;           // أيقونة الموقع
  
  // === التقييم ===
  rating?: number;               // تقييم (1-5)
  reviewCount?: number;          // عدد التقييمات
  popularityScore: number;       // درجة الشهرة (0-100)
  
  // === الميزات ===
  features: string[];            // الميزات الرئيسية
  pros: string[];                // المميزات
  cons: string[];                // العيوب
  alternatives: string[];        // معرفات البدائل
  
  // === الحالة ===
  status: ResourceStatus;        // active | inactive | broken | unknown
  lastChecked: string;           // ISO date
  lastUpdated: string;           // ISO date
  isVerified: boolean;           // هل تم التحقق منه؟
  
  // === المصدر ===
  source: DataSource;            // manual | crawler | community | api
  sourceUrl?: string;            // رابط المصدر (إن وجد)
  dataQuality: number;           // جودة البيانات (0-100)
  
  // === الإحصائيات ===
  createdAt: string;             // ISO date
  updatedAt: string;             // ISO date
  viewCount: number;             // عدد المشاهدات
  saveCount: number;             // عدد مرات الحفظ
}
```

## Supporting Types

```typescript
type ResourceType = 
  | 'platform'    // منصة تعليمية/عمل
  | 'course'      // دورة محددة
  | 'channel'     // قناة يوتيوب
  | 'tool'        // أداة برمجية
  | 'book'        // كتاب
  | 'podcast'     // بودكاست
  | 'newsletter'  // نشرة بريدية
  | 'blog'        // مدونة
  | 'github'      // مستودع GitHub
  | 'paper'       // ورقة بحثية
  | 'community'   // مجتمع
  | 'app'         // تطبيق
  | 'api'         // واجهة برمجية
  | 'game'        // لعبة تعليمية
  ;

type ContentFormat = 'video' | 'text' | 'interactive' | 'audio' | 'pdf' | 'certificate' | 'live' | 'project';

type Language = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'tr' | 'ur' | 'multi';

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

type PricingModel = 'free' | 'freemium' | 'paid' | 'subscription' | 'donation';

type ResourceStatus = 'active' | 'inactive' | 'broken' | 'unknown';

interface SocialLinks {
  twitter?: string;
  youtube?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
  telegram?: string;
  facebook?: string;
}

type DataSource = 'manual' | 'crawler' | 'community' | 'api';
```

## Category Entity

```typescript
interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  parentId: string | null;
  children: string[];        // معرفات الفئات الفرعية
  slug: string;
  icon: string;
  color: string;
  order: number;
  resourceCount: number;
  level: number;              // عمق التصنيف
  path: string[];            // المسار الكامل
  keywords: string[];
}
```

## Crawler Source Entity

```typescript
interface CrawlSource {
  id: string;
  name: string;
  url: string;
  category: string;
  type: 'awesome-list' | 'directory' | 'curated-list' | 'blog' | 'documentation';
  crawlStrategy: 'scrape' | 'api' | 'rss';
  lastCrawled: string | null;
  crawlFrequency: number;     // بالأيام
  isActive: boolean;
  robotsTxt: string;          // محتوى robots.txt المخزن
  respectRobotsTxt: boolean;
}
```
