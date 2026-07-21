# ملف المستخدم (User Profile)

> إصدار: 1.0  
> آخر تحديث: يوليو 2026  
> الحالة: **تصميم أولي**

---

## 1. المفهوم

`UserProfile` هو الكائن الأساسي الذي يمثل المستخدم داخل النظام.  
يُبنى هذا الكائن من إجابات الإرشاد الذكي، ويُحدّث تلقائياً مع تقدّم المستخدم.

---

## 2. هيكل البيانات

```typescript
interface UserProfile {
  // === معلومات أساسية ===
  id: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;

  // === البيانات الديموغرافية ===
  demographics: {
    ageGroup?: 'under_15' | '15_18' | '19_24' | '25_30' | '31_40' | '41_50' | 'over_50';
    educationLevel?: 'high_school' | 'undergraduate' | 'postgraduate' | 'graduate' | 'employed' | 'other';
    country?: string;
    preferredLanguage: 'arabic' | 'english' | 'both';
    englishLevel?: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
  };

  // === الأهداف والاهتمامات ===
  goals: string[];                    // IDs من قائمة الأهداف
  interests: string[];                // IDs من قائمة الاهتمامات
  dreamRole?: string;                 // الوظيفة المستقبلية المنشودة

  // === المهارات والخبرة ===
  techExperience: 'none' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  skillLevels: Record<string, SkillLevel>;
  // skillLevels = { "programming": "beginner", "ai": "intermediate", ... }

  // === أسلوب التعلم ===
  learningStyles: string[];           // video, reading, hands-on, quizzes, books, ...

  // === الوقت ===
  weeklyHoursAvailable: 'under_3' | '3_5' | '6_10' | 'over_10';

  // === الإمكانيات ===
  deviceType?: 'laptop' | 'tablet' | 'phone';
  os?: 'windows' | 'macos' | 'linux' | 'android' | 'ios';
  internetSpeed?: 'low' | 'medium' | 'high' | 'excellent';
  canPayForCourses?: boolean;
  preferFreeResources: boolean;       // افتراضياً true

  // === المسار التعليمي ===
  activePathId?: string;              // المسار الحالي
  completedPaths: string[];           // المسارات المكتملة
  savedPaths: string[];               // المسارات المحفوظة (لمقارنتها)

  // === الإحصائيات ===
  stats: UserStats;
}

type SkillLevel = 'absolute_beginner' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface UserStats {
  totalLearningHours: number;
  completedResources: number;
  completedProjects: number;
  earnedCertificates: number;
  currentStreak: number;              // الأيام المتتالية
  longestStreak: number;
  achievements: Achievement[];
  weeklyGoal: number;                 // ساعات هدف الأسبوع
  monthlyGoal: number;                // ساعات هدف الشهر
}
```

---

## 3. بناء الملف (Profile Builder)

```typescript
function buildUserProfile(answers: OnboardingAnswers): UserProfile {
  return {
    id: generateUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),

    demographics: {
      ageGroup: answers.age,
      educationLevel: answers.educationLevel,
      country: answers.country,
      preferredLanguage: answers.preferredLanguage ?? 'arabic',
      englishLevel: answers.englishLevel,
    },

    goals: answers.goals ?? [],
    interests: answers.interests ?? [],
    dreamRole: answers.dreamRole,

    techExperience: answers.techExperience ?? 'none',
    skillLevels: answers.skillLevels ?? {},

    learningStyles: answers.learningStyles ?? ['video'],

    weeklyHoursAvailable: answers.weeklyHoursAvailable ?? '3_5',

    deviceType: answers.deviceType,
    os: answers.os,
    internetSpeed: answers.internetSpeed,
    canPayForCourses: answers.canPayForCourses,
    preferFreeResources: answers.preferFreeResources ?? true,

    activePathId: undefined,
    completedPaths: [],
    savedPaths: [],

    stats: {
      totalLearningHours: 0,
      completedResources: 0,
      completedProjects: 0,
      earnedCertificates: 0,
      currentStreak: 0,
      longestStreak: 0,
      achievements: [],
      weeklyGoal: calculateWeeklyGoal(answers.weeklyHoursAvailable),
      monthlyGoal: calculateMonthlyGoal(answers.weeklyHoursAvailable),
    },
  };
}
```

---

## 4. تحديث الملف

```typescript
function updateUserProfile(
  profile: UserProfile,
  updates: Partial<UserProfile>
): UserProfile {
  return {
    ...profile,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}
```

يُستدعى هذا التابع في الحالات التالية:
- إكمال مورد تعليمي
- إتمام مشروع
- تغيير الأهداف من الإعدادات
- إعادة التقييم
- بداية أسبوع جديد (إعادة تعيين الهدف الأسبوعي)

---

## 5. خوارزمية احتساب الأهداف الأسبوعية والشهرية

```typescript
function calculateWeeklyGoal(hours: string): number {
  const map: Record<string, number> = {
    'under_3': 2,
    '3_5': 4,
    '6_10': 8,
    'over_10': 12,
  };
  return map[hours] ?? 4;
}

function calculateMonthlyGoal(hours: string): number {
  return calculateWeeklyGoal(hours) * 4;
}
```

---

## 6. الإنجازات (Achievements)

يُحتفظ بقائمة الإنجازات في `UserStats.achievements`.  
كل إنجاز له بنية:

```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'milestone' | 'streak' | 'skill' | 'project' | 'social';
}
```

أمثلة:
- `first_resource` — أكمل أول مورد تعليمي
- `seven_day_streak` — واظب 7 أيام متتالية
- `first_project` — أكمل أول مشروع عملي
- `skill_level_up` — وصلت لمستوى "متقدم" في مهارة معينة
- `ten_certificates` — حصلت على 10 شهادات
