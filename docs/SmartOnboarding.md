# نظام الإرشاد الذكي (Smart Onboarding)

> إصدار: 1.0  
> آخر تحديث: يوليو 2026  
> الحالة: **تصميم أولي — جاهز للتطوير**

---

## 1. المفهوم العام

نظام الإرشاد الذكي هو أول تفاعل حقيقي بين المستخدم والتطبيق بعد شاشة الترحيب.  
لا يُعتبر استبياناً تقليدياً، بل **محادثة تشخيصية ذكية** تهدف إلى بناء ملف شخصي متكامل للمستخدم (User Profile) يتم على أساسه:

- توليد مسار تعليمي مخصص (Personalized Learning Path)
- اقتراح الموارد المناسبة (الدورات، القنوات، الأدوات، المشاريع، الشهادات)
- تخصيص الصفحة الرئيسية بالكامل
- بناء نظام توصيات ديناميكي يتكيف مع تقدّم المستخدم

---

## 2. مبدأ التشغيل

```
[Splash Screen] → [Shاشة الترحيب / Welcome Screen]
                → [الإرشاد الذكي (يظهر مرة واحدة فقط)]
                → [شاشة التحليل + بناء المسار]
                → [الصفحة الرئيسية المخصصة]
```

### 2.1 متى يظهر؟

- يظهر **مرة واحدة فقط** بعد تثبيت التطبيق لأول مرة
- لا يمكن تخطيه بالكامل (يجب الإجابة على الأسئلة الأساسية على الأقل)
- يمكن العودة إليه لاحقاً من صفحة الإعدادات → "إعادة التقييم"
- بعد الإكمال، يتم تخزين `onboardingCompleted: true` في `localStorage`

### 2.2 التصميم العام

- لكل سؤال **بطاقة (Card)** منفصلة مع أيقونة متحركة
- أسفل البطاقة: أزرار التنقل (التالي/السابق/تخطي)
- أعلى الصفحة: **شريط تقدم (Progress Bar)** بنسبة مئوية
- إجابات متعددة الأنواع: اختيار من متعدد (单选|多选), تصنيف (Rating), نص قصير
- جميع الإجابات تُحفظ تلقائياً في `localStorage` لحين إتمام العملية

---

## 3. هيكل الأسئلة

ينقسم إلى 8 أقسام رئيسية:

| القسم | الموضوع | الحقول |
|-------|---------|--------|
| الأول | المعلومات الأساسية | العمر، المرحلة الدراسية، الدولة، اللغة، مستوى الإنجليزية، الخبرة التقنية |
| الثاني | الهدف الرئيسي | أهداف متعددة (برمجة، AI، وظيفة، عمل حر، ...) |
| الثالث | الاهتمامات | مجالات يفضلها المستخدم |
| الرابع | الخبرة الحالية | مستوى لكل مجال (مبتدئ → محترف) |
| الخامس | أسلوب التعلم | فيديو، قراءة، مشاريع، اختبارات، كتب، ... |
| السادس | الوقت المتاح | ساعات أسبوعياً (أقل من 3 → أكثر من 10) |
| السابع | الغاية النهائية | الوظيفة/المسار الذي يحلم به |
| الثامن | الإمكانيات | الجهاز، الإنترنت، القدرة الشرائية |

لتفاصيل كل سؤال، انظر [QuestionFlow.md](./QuestionFlow.md).

---

## 4. شاشة التحليل

بعد الإجابة على جميع الأسئلة (أو الأسئلة الأساسية)، تُعرض شاشة:

```
جاري بناء رحلتك التعليمية...
```

### 4.1 العناصر

- رسم متحرك (Lottie / CSS Animation) لدائرة تحميل أو شعار يبني نفسه
- نص متحرك: "جارٍ تحليل إجاباتك..." → "نحدد أهدافك..." → "نختار الموارد المناسبة..." → "نبني مسارك المخصص..."
- مدة تقديرية: 2–5 ثوانٍ (أو أطول إذا كان التحليل معقداً)

### 4.2 ماذا يحدث خلف الكواليس؟

1. تجميع بيانات `UserProfile` من الإجابات
2. تشغيل `ScoringEngine` لحساب النقاط لكل مجال
3. تشغيل `RoadmapGenerator` لبناء المسار
4. تشغيل `RecommendationEngine` لاقتراح الموارد
5. حفظ النتائج في `localStorage`
6. تحديث حالة `onboardingCompleted = true`

---

## 5. هيكل البيانات

```typescript
interface OnboardingState {
  completed: boolean;
  currentStep: number;
  totalSteps: number;
  answers: Partial<OnboardingAnswers>;
  profile: UserProfile | null;
  roadmap: LearningPath | null;
  createdAt: string;
  updatedAt: string;
}

interface OnboardingAnswers {
  // Section 1
  age?: number;
  educationLevel?: string;
  country?: string;
  preferredLanguage?: string;
  englishLevel?: string;
  techExperience?: string;

  // Section 2
  goals: string[];

  // Section 3
  interests: string[];

  // Section 4
  skillLevels: Record<string, string>;

  // Section 5
  learningStyles: string[];

  // Section 6
  weeklyHoursAvailable?: string;

  // Section 7
  dreamRole?: string;

  // Section 8
  deviceType?: string;
  os?: string;
  internetSpeed?: string;
  canPayForCourses?: boolean;
  preferFreeResources?: boolean;
}
```

---

## 6. تخزين البيانات

| البيانات | الوجهة | الغرض |
|----------|--------|-------|
| الإجابات | `localStorage` | استكمال لاحق / استعادة |
| UserProfile | `localStorage` + (قاعدة بيانات عند توفر حساب) | بناء المسار والتوصيات |
| LearningPath | `localStorage` | عرض المسار الحالي |
| OnboardingState | `localStorage` | حالة الإرشاد (مكتمل/غير مكتمل) |
| Sync | IndexedDB (offline) + REST API (online) | مزامنة بين الأجهزة |

---

## 7. معمارية الكود المقترحة

```
src/
└── features/
    └── onboarding/
        ├── index.ts                     # Barrel export
        ├── OnboardingFlow.tsx            # المكون الرئيسي (Stepper)
        ├── components/
        │   ├── WelcomeCard.tsx           # بطاقة الترحيب
        │   ├── QuestionCard.tsx          # بطاقة السؤال
        │   ├── ProgressBar.tsx           # شريط التقدم
        │   ├── AnalysisScreen.tsx        # شاشة التحليل
        │   └── ResultPreview.tsx         # معاينة النتيجة
        ├── hooks/
        │   ├── useOnboarding.ts          # حالة الإرشاد
        │   └── useOnboardingAnswers.ts   # إدارة الإجابات
        ├── data/
        │   └── questions.ts             # تعريف جميع الأسئلة
        ├── services/
        │   ├── onboardingService.ts      # منطق الإرشاد
        │   └── profileBuilder.ts         # بناء UserProfile
        └── types/
            └── onboarding.ts            # أنواع البيانات
```

---

## 8. الاختبارات

- اختبار تدفّق الإرشاد الكامل (من البداية إلى النهاية)
- اختبار حفظ الإجابات واستعادتها
- اختبار شاشة التحليل
- اختبار العودة إلى سؤال سابق
- اختبار تخطي الأسئلة غير الإلزامية
- اختبار عدم ظهور الإرشاد مرة أخرى
- اختبار إعادة التقييم من الإعدادات
