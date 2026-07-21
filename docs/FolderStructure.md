# الهيكل النهائي للمشروع

```
dalylak/
├── crawler/                         # Playwright crawling system
│   ├── src/
│   │   ├── index.ts                 # Entry point
│   │   ├── config/
│   │   │   ├── sources.ts           # Target sources
│   │   │   ├── categories.ts        # Categories
│   │   │   └── settings.ts          # Crawl settings
│   │   ├── core/
│   │   │   ├── Crawler.ts           # Main crawler engine
│   │   │   ├── Queue.ts             # URL queue
│   │   │   ├── RateLimiter.ts       # Rate limiting
│   │   │   └── RobotsParser.ts      # robots.txt parser
│   │   ├── extractors/
│   │   │   ├── MetadataExtractor.ts
│   │   │   ├── ContentExtractor.ts
│   │   │   ├── MediaExtractor.ts
│   │   │   └── LinkExtractor.ts
│   │   ├── classifiers/
│   │   ├── validators/
│   │   ├── storage/
│   │   │   └── JsonStorage.ts
│   │   └── utils/
│   │       ├── logger.ts
│   │       └── helpers.ts
│   ├── data/
│   │   ├── raw/
│   │   ├── processed/
│   │   └── final/
│   ├── logs/
│   ├── screenshots/
│   ├── package.json
│   └── tsconfig.json
│
├── src/                             # Main application
│   ├── app/
│   │   ├── config/constants.ts
│   │   ├── providers/
│   │   └── router/AppRouter.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── cards/
│   │   ├── modals/
│   │   └── common/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── learning/
│   │   ├── youtube/
│   │   ├── freelancing/
│   │   ├── tools/
│   │   ├── tests/
│   │   ├── ai/
│   │   └── about/
│   ├── hooks/
│   ├── services/
│   │   ├── searchService.ts
│   │   ├── storageService.ts
│   │   └── exportService.ts
│   ├── store/
│   │   ├── themeStore.ts
│   │   ├── favoritesStore.ts
│   │   └── toastStore.ts
│   ├── data/
│   │   ├── categories.ts            # Full taxonomy
│   │   ├── learning.ts
│   │   ├── youtube.ts
│   │   ├── work.ts
│   │   ├── tools.ts
│   │   ├── tests.ts
│   │   ├── ai.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── resource.ts              # Advanced types
│   │   └── index.ts
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── docs/                            # Documentation
│   ├── Vision.md
│   ├── PRD.md
│   ├── Architecture.md
│   ├── CleanArchitecture.md
│   ├── TechStack.md
│   ├── FolderStructure.md
│   ├── Roadmap.md
│   ├── ExecutionPlan.md
│   ├── DataModel.md
│   ├── Taxonomy.md
│   ├── CrawlingStrategy.md
│   ├── PlaywrightCrawler.md
│   ├── DataQuality.md
│   ├── SearchEngine.md
│   ├── OfflineStrategy.md
│   ├── AndroidMigration.md
│   ├── ReactNativePlan.md
│   ├── TestingStrategy.md
│   ├── Security.md
│   ├── Performance.md
│   ├── Accessibility.md
│   ├── SEO.md
│   ├── API.md
│   ├── Components.md
│   ├── DesignSystem.md
│   ├── UIUX.md
│   ├── Changelog.md
│   ├── Risks.md
│   └── FutureIdeas.md
│
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── index.html
└── README.md
```
