# توثيق نظام المكونات (Components)

## Atomic Design Levels

### Atoms (UI Components)
```
src/components/ui/
├── Button/          # أزرار بأنماط مختلفة
├── Badge/           # شارات/وسوم
├── Card/            # بطاقة أساسية
├── Modal/           # نافذة منبثقة
├── SearchBox/       # مربع بحث
├── EmptyState/      # حالة فارغة
├── Loading/         # حالة التحميل
├── SectionHeader/   # عنوان القسم
├── ThemeToggle/     # تبديل الثيم
├── FavoriteButton/  # زر المفضلة
├── Icon/            # أيقونة ديناميكية
└── Toast/           # إشعارات
```

### Molecules (Composite)
```
src/components/
├── cards/ResourceCard/      # بطاقة مورد
├── layout/Navbar/           # شريط تنقل
├── layout/Sidebar/          # قائمة جانبية
├── layout/BottomNav/        # شريط سفلي (جوال)
├── layout/Footer/           # تذييل
├── layout/BackToTop/        # زر رجوع للأعلى
├── modals/DetailsModal/     # تفاصيل المورد
└── modals/FavoritesModal/   # قائمة المفضلة
```

### Organisms (Features/Pages)
```
src/features/
├── dashboard/DashboardPage/
├── learning/LearningPage/
├── youtube/YoutubePage/
├── freelancing/FreelancingPage/
├── tools/ToolsPage/
├── tests/TestsPage/
├── ai/AiPage/
└── about/AboutPage/
```

## Component Patterns

### كل مكون UI يجب أن:
1. يقبل `className` للتخصيص
2. يدعم `ref` عبر `forwardRef` (للتفاعلية)
3. له `displayName`
4. يكون `aria-label` مناسب
5. يدعم `data-testid` للاختبارات

### Props Convention
```typescript
// Bool props → اسم بدون prefix
<Button loading />

// Event handlers → on-prefix
<Button onClick={handleClick} />

// Data → children أو data-prefix
<Card>
  <ResourceCard resource={data} />
</Card>
```
