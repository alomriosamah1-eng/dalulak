# محرك مسار التعلّم (Learning Path Engine)

> إصدار: 1.0  
> آخر تحديث: يوليو 2026  
> الحالة: **تصميم أولي**

---

## 1. المفهوم

محرك مسار التعلّم هو المسؤول عن إدارة المسار التعليمي طوال رحلة المستخدم.  
بينما يقوم `RoadmapGenerator` ببناء المسار لأول مرة، يقوم `LearningPathEngine` بـ:

- تحديث المسار بناءً على تقدّم المستخدم
- إعادة ترتيب الأولويات
- اكتشاف الفجوات والفجوات
- إضافة/إزالة مهارات حسب الأداء
- إدارة المسارات المتعددة

---

## 2. دورة حياة المسار

```
إنشاء → نشط → قيد التقدّم
                ↓
         [إعادة تقييم]
                ↓
        تحديث المسار ←→ حفظ القديم
                ↓
          مكتمل → أرشفة
```

---

## 3. إدارة المهارات (Skill Graph)

المهارات منظمة على شكل **Graph موجه غير دوري (DAG)**:

```
         HTML
        /    \
     CSS    JavaScript
      |        |
  Flexbox   React
      |        |
 Bootstrap   Next.js
```

### 3.1 أنواع العقد

```typescript
interface SkillNode {
  id: string;
  name: string;
  category: string;            // programming, design, ai, etc.
  prerequisites: string[];     // IDs المهارات السابقة
  relatedSkills: string[];     // IDs مهارات مرتبطة
  estimatedHours: number;      // ساعات تعلّم تقديرية
  difficulty: SkillLevel;
  resources: string[];         // موارد مقترحة
  projects: string[];          // مشاريع عملية
}
```

### 3.2 التبعيات (Prerequisites)

عند إنشاء المسار، يُستخدم **Topological Sort** لترتيب المهارات بحسب التبعيات:

```typescript
function topologicalSort(skills: SkillNode[]): SkillNode[] {
  const visited = new Set<string>();
  const result: SkillNode[] = [];

  function dfs(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = skills.find(s => s.id === nodeId);
    if (!node) return;

    for (const prereq of node.prerequisites) {
      dfs(prereq);
    }
    result.push(node);
  }

  for (const skill of skills) {
    if (!visited.has(skill.id)) dfs(skill.id);
  }

  return result;
}
```

---

## 4. فجوات التعلم (Skill Gaps)

المحرك يكتشف الفجوات بطريقتين:

### 4.1 الفجوات الهيكلية

مهارة تتطلب `Prerequisite` لم يتعلمها المستخدم بعد.

```
المستخدم في "React" لكنه لم يتعلم "JavaScript ES6" ← يُضاف تلقائياً كفجوة
```

### 4.2 الفجوات السلوكية

اكتشاف أن المستخدم يواجه صعوبة في مجال معين (بناءً على درجات الاختبارات، أو الوقت المستغرق):

```typescript
function detectSkillGaps(userProgress: UserProgress): SkillGap[] {
  const gaps: SkillGap[] = [];

  for (const [skillId, progress] of Object.entries(userProgress.skills)) {
    // إذا قضى وقتاً طويلاً في مهارة ولم يتقدم
    if (progress.timeSpent > skillAvgTime(skillId) * 1.5
        && progress.quizScore < 60) {
      gaps.push({
        skillId,
        type: 'struggling',
        suggestedAction: 'review_basics',
        suggestedResources: getEasierResources(skillId),
      });
    }

    // إذا كانت نسبة الاختبارات منخفضة
    if (progress.quizScore < 40) {
      gaps.push({
        skillId,
        type: 'weak_foundation',
        suggestedAction: 'retake_quiz',
        suggestedResources: getFoundationResources(skillId),
      });
    }
  }

  return gaps;
}
```

---

## 5. إعادة التقييم (Re-assessment)

تُطلب إعادة التقييم في الحالات التالية:

| الحالة | النوع | الإجراء |
|--------|-------|---------|
| تغيير الأهداف | يدوي | المستخدم يعدّل أهدافه → إعادة بناء المسار |
| بعد 3 شهور | تلقائي | المحرك يطلب مراجعة سريعة (هل تغيرت أهدافك؟) |
| فشل في الاختبارات | تلقائي | المحرك يقترح مراجعة المستوى الحالي |
| إكمال مسار | تلقائي | المحرك يسأل: "هل تريد مساراً جديداً؟" |
| عدم النشاط لمدة 30 يوماً | تلقائي | المحرك يرسل إشعاراً لتحديث الأهداف |

### 5.1 خوارزمية إعادة التقييم

```typescript
function reassessPath(
  currentPath: LearningPath,
  currentProfile: UserProfile
): LearningPath {
  // 1. أخذ snapshot من المسار الحالي
  const oldPath = cloneDeep(currentPath);
  oldPath.status = 'archived';

  // 2. بناء مسار جديد
  const newPath = generateRoadmap(currentProfile);

  // 3. الحفاظ على المهارات المكتملة
  for (const phase of newPath.phases) {
    for (const skill of phase.skills) {
      const completed = findCompletedSkill(oldPath, skill.id);
      if (completed) {
        skill.status = 'completed';
        skill.progress = 100;
      }
    }
  }

  return newPath;
}
```

---

## 6. التقدّم (Progress Tracking)

كل مهارة في المسار لها نطاق تقدّم:

```typescript
interface SkillProgress {
  skillId: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress: number;                     // 0–100
  timeSpent: number;                    // دقائق
  resourcesCompleted: string[];
  projectsCompleted: string[];
  quizScores: { quizId: string; score: number; date: string }[];
  lastAccessed: string;
}
```

### 6.1 احتساب التقدّم الكلي

```typescript
function calculateOverallProgress(path: LearningPath): number {
  const allSkills = path.phases.flatMap(p => p.skills);
  if (allSkills.length === 0) return 0;

  const totalProgress = allSkills.reduce((sum, s) => sum + (s.progress ?? 0), 0);
  return Math.round(totalProgress / allSkills.length);
}
```

### 6.2 احتساب تقدّم المرحلة

```typescript
function calculatePhaseProgress(phase: Phase): number {
  const completedSkills = phase.skills.filter(s => s.status === 'completed');
  const projectsDone = phase.projects.filter(p => p.completed);
  const quizzesPassed = phase.quizzes.filter(q => q.passed);

  const skillScore = (completedSkills.length / phase.skills.length) * 60;
  const projectScore = (projectsDone.length / phase.projects.length) * 25;
  const quizScore = (quizzesPassed.length / phase.quizzes.length) * 15;

  return Math.round(skillScore + projectScore + quizScore);
}
```

---

## 7. الموارد الذكية (Adaptive Resources)

المحرك يعدّل الموارد المقترحة بناءً على أداء المستخدم:

```typescript
function adaptResources(
  phase: Phase,
  userProgress: UserProgress
): RecommendedResource[] {
  const adapted = phase.resources.map(resource => {
    const skill = phase.skills.find(s => s.id === resource.skillId);
    if (!skill) return resource;

    // إذا كان المستخدم متقدماً في المهارة، استبدل المورد بمورد متقدم
    if (skill.progress > 70) {
      return replaceWithAdvancedResource(resource);
    }

    // إذا كان المستخدم متعثراً، استبدل بمورد أسهل
    if (skill.quizScore < 40) {
      return replaceWithEasierResource(resource);
    }

    return resource;
  });

  return adapted;
}
```

---

## 8. إدارة المسارات المتعددة

```typescript
interface MultiPathManager {
  activePaths: LearningPath[];        // حد أقصى 3 مسارات نشطة
  completedPaths: LearningPath[];
  savedPaths: LearningPath[];

  // إضافة مسار جديد
  addPath(newPath: LearningPath): void;

  // التبديل بين المسارات (تعليق مسار وتشغيل آخر)
  switchPath(pathId: string): void;

  // دمج مسارين
  mergePaths(pathAId: string, pathBId: string): LearningPath;

  // مقارنة مسارين
  comparePaths(pathAId: string, pathBId: string): PathComparison;
  
  // حذف مسار
  removePath(pathId: string): void;
}
```

---

## 9. التخزين والمزامنة

| البيانات | محلياً | السحابة |
|----------|--------|---------|
| المسار الحالي | `localStorage` | REST API (عند تسجيل الدخول) |
| تقدّم المهارات | `localStorage` | REST API |
| سجل الاختبارات | `localStorage` | REST API |
| المسارات المؤرشفة | `IndexedDB` | REST API |

### Offline First

```typescript
class PathStorage {
  async savePath(path: LearningPath): Promise<void> {
    await localStorage.setItem(`path_${path.id}`, JSON.stringify(path));
    if (navigator.onLine) {
      await api.savePath(path);
    } else {
      this.pendingSync.push(path);
    }
  }

  async syncPending(): Promise<void> {
    for (const path of this.pendingSync) {
      await api.savePath(path);
    }
    this.pendingSync = [];
  }
}
```
