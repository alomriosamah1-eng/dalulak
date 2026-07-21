import { BookOpen, Youtube, Briefcase, Wrench, ClipboardCheck, BrainCircuit, Palette, Zap, TrendingUp, Globe, Users, Headphones, Mail, Book, Github, Download } from 'lucide-react';
import { SectionHeader, Icon, Button } from '../../components/ui';
import { sectionCounts, totalResources } from '../../data';
import { formatNumber } from '../../utils/format';
import { useToastStore } from '../../store/toastStore';
import type { SectionId } from '../../types';

const statCards = [
  { id: 'learning' as SectionId, icon: BookOpen, label: 'منصة تعليم مجانية', count: sectionCounts.learning, color: '#3B82F6' },
  { id: 'youtube' as SectionId, icon: Youtube, label: 'قناة يوتيوب تعليمية', count: sectionCounts.youtube, color: '#F43F5E' },
  { id: 'work' as SectionId, icon: Briefcase, label: 'منصة عمل عن بعد', count: sectionCounts.work, color: '#10B981' },
  { id: 'tools' as SectionId, icon: Wrench, label: 'أداة إنتاج مجانية', count: sectionCounts.tools, color: '#F59E0B' },
  { id: 'ai' as SectionId, icon: BrainCircuit, label: 'منصة ذكاء اصطناعي', count: sectionCounts.ai, color: '#06F7F7' },
  { id: 'design' as SectionId, icon: Palette, label: 'مورد تصميم', count: sectionCounts.design, color: '#e67e22' },
  { id: 'business' as SectionId, icon: Briefcase, label: 'مورد أعمال', count: sectionCounts.business, color: '#2ecc71' },
  { id: 'books' as SectionId, icon: Book, label: 'كتاب', count: sectionCounts.books, color: '#8b5cf6' },
];

const quickLinks = [
  { id: 'learning' as SectionId, icon: BookOpen, title: 'منصات التعلم المجانية', desc: 'اكتشف أفضل منصات التعليم المجانية مع شهادات معتمدة', color: '#3B82F6' },
  { id: 'youtube' as SectionId, icon: Youtube, title: 'قنوات يوتيوب التعليمية', desc: 'أفضل القنوات التعليمية المجانية على اليوتيوب', color: '#F43F5E' },
  { id: 'work' as SectionId, icon: Briefcase, title: 'منصات العمل عن بعد', desc: 'ابدأ رحلتك في العمل الحر والتوظيف عن بعد', color: '#10B981' },
  { id: 'tools' as SectionId, icon: Wrench, title: 'أدوات الإنتاج المجانية', desc: 'أقوى الأدوات المجانية لتعزيز إنتاجيتك', color: '#F59E0B' },
  { id: 'tests' as SectionId, icon: ClipboardCheck, title: 'منصات الاختبارات والتقييم', desc: 'اختبر مهاراتك واحصل على تقييم مجاني', color: '#8B5CF6' },
  { id: 'ai' as SectionId, icon: BrainCircuit, title: 'الذكاء الاصطناعي', desc: 'أفضل منصات وأدوات الذكاء الاصطناعي المجانية', color: '#06F7F7' },
  { id: 'design' as SectionId, icon: Palette, title: 'التصميم والإبداع', desc: 'أدوات وموارد التصميم الجرافيكي وتجربة المستخدم', color: '#e67e22' },
  { id: 'business' as SectionId, icon: Briefcase, title: 'إدارة الأعمال', desc: 'موارد تعليمية في ريادة الأعمال والإدارة', color: '#2ecc71' },
  { id: 'productivity' as SectionId, icon: Zap, title: 'الإنتاجية', desc: 'أدوات وتقنيات لزيادة إنتاجيتك وتنظيم وقتك', color: '#f1c40f' },
  { id: 'marketing' as SectionId, icon: TrendingUp, title: 'التسويق الرقمي', desc: 'أدوات وموارد التسويق الإلكتروني وتحسين محركات البحث', color: '#e74c3c' },
  { id: 'freelancing' as SectionId, icon: Globe, title: 'العمل الحر', desc: 'منصات وأدوات العمل الحر والاستقلالية المهنية', color: '#1abc9c' },
  { id: 'communities' as SectionId, icon: Users, title: 'المجتمعات', desc: 'مجتمعات تقنية وعلمية عربية وعالمية', color: '#9b59b6' },
  { id: 'podcasts' as SectionId, icon: Headphones, title: 'البودكاست', desc: 'أفضل البودكاستات التقنية والعلمية', color: '#f97316' },
  { id: 'newsletters' as SectionId, icon: Mail, title: 'النشرات البريدية', desc: 'نشرات بريدية تقنية وتعليمية مميزة', color: '#3b82f6' },
  { id: 'books' as SectionId, icon: Book, title: 'الكتب', desc: 'كتب تقنية وتعليمية مجانية', color: '#8b5cf6' },
  { id: 'open-source' as SectionId, icon: Github, title: 'المصادر المفتوحة', desc: 'أفضل المشاريع مفتوحة المصدر', color: '#2c3e50' },
];

interface DashboardPageProps {
  onNavigate: (section: SectionId) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { addToast } = useToastStore();

  const handleExport = () => {
    const data = {
      stats: sectionCounts,
      total: totalResources,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dalylak-stats-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('تم تصدير البيانات بنجاح', 'success');
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        icon={<Icon name="LayoutDashboard" className="w-6 h-6" />}
        title="لوحة التحكم"
        subtitle="نظرة عامة على جميع أقسام دليلك التعليمي والعملي"
        color="#14B8A6"
      />

      <div className="stagger-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.id} className="neu-card p-6 text-center cursor-default">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }}
              >
                <stat.icon className="w-7 h-7 relative z-10" style={{ color: stat.color }} />
                <div className="absolute inset-0 rounded-2xl" style={{
                  background: `radial-gradient(circle at 50% 50%, ${stat.color}15 0%, transparent 70%)`,
                }} />
              </div>
            </div>
            <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>{formatNumber(stat.count)}</div>
            <div className="text-sm text-second font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="neu-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🎯</div>
          <div>
            <span className="text-second">إجمالي الموارد: </span>
            <span className="text-2xl font-black" style={{ color: 'var(--color-primary)' }}>{formatNumber(totalResources)}</span>
            <span className="text-muted-custom text-sm mr-2">مورداً</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            تصدير JSON
          </Button>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold text-main mb-6 text-center">الوصول السريع</h4>
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="neu-card p-6 text-right group cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }}
                >
                  <link.icon className="w-8 h-8" style={{ color: link.color }} />
                </div>
              </div>
              <h5 className="font-bold text-main text-center mb-2">{link.title}</h5>
              <p className="text-sm text-second text-center leading-relaxed">{link.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
