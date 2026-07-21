# مولّد المسار التعليمي (Roadmap Generator)

> إصدار: 1.0  
> آخر تحديث: يوليو 2026  
> الحالة: **تصميم أولي**

---

## 1. المفهوم

بعد أن يحدد `ScoringEngine` المهارات والموارد المناسبة، يقوم `RoadmapGenerator` ببناء **خريطة طريق تعليمية** (Learning Roadmap) متكاملة مكونة من مراحل متسلسلة، كل مرحلة تبني على التي قبلها.

الهدف: تحويل قائمة المهارات المبعثرة إلى **رحلة تعلم منظمة** تشبه المناهج الدراسية الاحترافية.

---

## 2. هيكل المسار

```typescript
interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'archived';

  // === المراحل ===
  phases: Phase[];

  // === إحصائيات المسار ===
  stats: PathStats;

  // === مسارات بديلة (للمقارنة) ===
  alternatives: string[];   // IDs

  // === البيانات الأولية (Profile Snapshot) ===
  basedOnProfile: {
    goals: string[];
    interests: string[];
    techExperience: string;
    weeklyHoursAvailable: string;
  };
}

interface Phase {
  id: string;
  order: number;
  title: string;
  description: string;
  goal: string;                     // الهدف من هذه المرحلة
  duration: string;                 // المدة التقديرية (e.g. "4 أسابيع")
  difficulty: SkillLevel;
  status: 'locked' | 'available' | 'in_progress' | 'completed';

  // === المهارات المطلوب تعلمها ===
  skills: SkillNode[];

  // === الموارد المقترحة ===
  resources: RecommendedResource[];

  // === المشاريع العملية ===
  projects: RecommendedProject[];

  // === الاختبارات ===
  quizzes: RecommendedQuiz[];

  // === الشهادات المقترحة ===
  certificates: RecommendedCertificate[];

  // === نسبة إنجاز المرحلة ===
  completionPercentage: number;
}
```

---

## 3. مراحل المسار العامة

| المرحلة | الاسم | الهدف | المدة التقديرية (لمبتدئ) |
|---------|------|-------|--------------------------|
| الأولى | الأساسيات (Foundation) | بناء قاعدة متينة من المفاهيم الأساسية | 4–8 أسابيع |
| الثانية | التطبيق (Application) | تطبيق المفاهيم في مشاريع صغيرة | 6–12 أسبوعاً |
| الثالثة | التخصص (Specialization) | التعمق في المجال المختار | 8–16 أسبوعاً |
| الرابعة | الاحتراف (Mastery) | مشاريع معقدة + شهادات احترافية | 12–24 أسبوعاً |

### 3.1 مثــال: مسار تعلم البرمجة (Frontend)

| المرحلة | المهارات | المدة | المشاريع |
|---------|----------|-------|---------|
| الأولى | HTML, CSS, أساسيات JS | 6 أسابيع | صفحة شخصية |
| الثانية | JS متقدم, Git, Responsive Design | 8 أسابيع | موقع متكامل |
| الثالثة | React/Next.js, APIs, State Mgmt | 10 أسابيع | تطبيق تفاعلي |
| الرابعة | Testing, Performance, CI/CD | 12 أسبوعاً | مشروع تخرج + Portfolio |

---

## 4. خوارزمية التوليد

```typescript
function generateRoadmap(profile: UserProfile): LearningPath {
  // 1. تحديد المهارات المطلوبة بناءً على الأهداف
  const targetSkills = identifyTargetSkills(profile.goals, profile.dreamRole);

  // 2. تصفية المهارات حسب المستوى الحالي
  const filteredSkills = filterByCurrentLevel(targetSkills, profile.skillLevels);

  // 3. ترتيب المهارات (تسلسل تعليمي منطقي)
  const sequencedSkills = topologicalSort(filteredSkills);

  // 4. توزيع المهارات على المراحل
  const phases = distributeIntoPhases(sequencedSkills, profile);

  // 5. إضافة الموارد المقترحة لكل مرحلة
  for (const phase of phases) {
    phase.resources = recommendResources(phase.skills, profile);
    phase.projects = recommendProjects(phase.skills, phase.difficulty);
    phase.quizzes = recommendQuizzes(phase.skills, phase.difficulty);
    phase.certificates = recommendCertificates(phase.skills);
  }

  // 6. احتساب المدة التقديرية
  for (const phase of phases) {
    phase.duration = estimateDuration(phase, profile.weeklyHoursAvailable);
  }

  return {
    id: generateUUID(),
    userId: profile.id,
    title: generatePathTitle(profile.goals),
    description: generatePathDescription(profile),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    phases,
    stats: { totalPhases: phases.length, completedPhases: 0, ... },
    basedOnProfile: {
      goals: profile.goals,
      interests: profile.interests,
      techExperience: profile.techExperience,
      weeklyHoursAvailable: profile.weeklyHoursAvailable,
    },
    alternatives: [],
  };
}
```

---

## 5. التوزيع على المراحل

```typescript
function distributeIntoPhases(
  skills: SkillNode[],
  profile: UserProfile
): Phase[] {
  const phases: Phase[] = [];
  const level = profile.techExperience;

  const phaseCount = 4;
  const skillsPerPhase = Math.ceil(skills.length / phaseCount);

  for (let i = 0; i < phaseCount; i++) {
    const phaseSkills = skills.slice(i * skillsPerPhase, (i + 1) * skillsPerPhase);
    if (phaseSkills.length === 0) continue;

    phases.push({
      id: generateUUID(),
      order: i + 1,
      title: PHASE_TITLES[i],
      description: PHASE_DESCRIPTIONS[i],
      goal: generatePhaseGoal(phaseSkills, i),
      duration: '',
      difficulty: getPhaseDifficulty(level, i),
      status: i === 0 ? 'available' : 'locked',
      skills: phaseSkills,
      resources: [],
      projects: [],
      quizzes: [],
      certificates: [],
      completionPercentage: 0,
    });
  }

  return phases;
}
```

---

## 6. احتساب المدة التقديرية

```typescript
function estimateDuration(phase: Phase, weeklyHours: string): string {
  const hoursMap: Record<string, number> = {
    'under_3': 3, '3_5': 5, '6_10': 8, 'over_10': 14
  };
  const hoursPerWeek = hoursMap[weeklyHours] ?? 5;

  const totalHours = phase.skills.reduce((sum, skill) => sum + skill.estimatedHours, 0);
  const weeks = Math.ceil(totalHours / hoursPerWeek);

  if (weeks <= 1) return `${weeks} أسبوع`;
  return `${weeks} أسابيع`;
}
```

---

## 7. مسارات متعددة

المستخدم يمكنه امتلاك أكثر من مسار تعليمي في نفس الوقت:

```typescript
interface UserPaths {
  activePaths: LearningPath[];        // المسارات النشطة
  completedPaths: LearningPath[];     // المسارات المكتملة
  savedPaths: LearningPath[];         // للمقارنة (ليس نشطاً)
}
```

### حالة الاستخدام

مستخدم لديه مساران:
1. **مسار أساسي**: تعلم Frontend Development (نشط)
2. **مسار ثانوي**: أساسيات الذكاء الاصطناعي (مجمّد)

يمكنه التبديل بينهما، أو دمج مسارين في مسار واحد.

---

## 8. التعديل على المسار

المستخدم يستطيع:
- إعادة ترتيب المراحل يدوياً (Drag & Drop)
- إضافة مهارة جديدة إلى مرحلة
- حذف مهارة من مرحلة
- تغيير مدة المرحلة
- إضافة مسار بديل وحفظه للمقارنة

### استخدامات متقدمة

```
إعادة التقييم → يبني مساراً جديداً → يحفظ القديم تلقائياً كـ "مسار سابق"
مقارنة مسارين → يعرض جدول مقارنة جنباً إلى جنب
دمج مسارين → يأخذ أفضل العناصر من كل مسار
```

---

## 9. الصفحة الرئيسية بعد المسار

بعد إنشاء المسار، تعرض الصفحة الرئيسية:

```
🌅  صباح الخير يا [اسم المستخدم]!

📊  متابعة رحلتي
    ┌─────────────────────────────────────┐
    │  [████████░░░░░░░░░░]  35%           │
    │  المرحلة الأولى: الأساسيات           │
    │  ▶  أكمل الدرس التالي: HTML Basics   │
    └─────────────────────────────────────┘

📖  الموارد المقترحة اليوم
    • CS50 (دورة فيديو)
    • HTML & CSS (كتاب)

🏆  إنجازات الأسبوع
    ✨ واصلت 3 أيام متتالية
    📚 أكملت درسين

🎯  أهداف هذا الأسبوع (6 ساعات)
    ▰▰▰▰▰▰▰▰▰▰▰░░ 4.5 ساعة
```
