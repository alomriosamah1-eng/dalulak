# Clean Architecture Detailed

## Dependency Rule

الاعتماديات تتجه للداخل فقط. الـ Outer layers تعتمد على Inner layers، والعكس غير صحيح.

## Layer Details

### Domain Layer (src/domain/)
```
domain/
├── entities/
│   ├── Resource.ts
│   ├── Category.ts
│   ├── Tag.ts
│   └── Source.ts
├── value-objects/
│   ├── Language.ts
│   ├── DifficultyLevel.ts
│   ├── PriceType.ts
│   └── LinkStatus.ts
├── repositories/
│   ├── IResourceRepository.ts
│   ├── ICategoryRepository.ts
│   └── ITagRepository.ts
└── use-cases/
    ├── SearchResources.ts
    ├── GetResourceDetails.ts
    └── ValidateLink.ts
```

### Application Layer (src/services/)
```
services/
├── searchService.ts
├── storageService.ts
├── exportService.ts
├── taxonomyService.ts
└── validationService.ts
```

### Data Layer (src/data/)
```
data/
├── repositories/
│   ├── resourceRepository.ts
│   ├── categoryRepository.ts
│   └── tagRepository.ts
├── sources/
│   ├── localDataSource.ts
│   └── crawlerDataSource.ts
└── models/
    ├── resourceModel.ts
    └── categoryModel.ts
```

### Presentation Layer (src/)
```
components/  # Atomic Design components
features/    # Page-level components
hooks/       # Custom React hooks
store/       # Zustand state management
```

## Benefits

1. **Testability** — كل طبقة يمكن اختبارها بشكل مستقل
2. **Maintainability** — تغيير UI لا يؤثر على Domain
3. **Flexibility** — استبدال localStorage بـ SQLite سهل
4. **Reusability** — Domain logic يمكن استخدامه في Web و Mobile
5. **Separation of Concerns** — فصل كامل للمسؤوليات
