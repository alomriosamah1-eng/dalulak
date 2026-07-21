import { Settings, Moon, Sun, Monitor, Download, Heart, Info, Mail, MessageCircle, Send } from 'lucide-react';
import { SectionHeader } from '../../components/ui';
import { useThemeStore } from '../../store/themeStore';
import { Button } from '../../components/ui';
import { totalResources, sectionCounts } from '../../data';
import { formatNumber } from '../../utils/format';
import { useToastStore } from '../../store/toastStore';

const settingsColor = '#64748B';

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const { addToast } = useToastStore();

  const themes = [
    { key: 'dark' as const, icon: Moon, label: 'داكن' },
    { key: 'light' as const, icon: Sun, label: 'فاتح' },
    { key: 'amoled' as const, icon: Monitor, label: 'أموليد' },
  ];

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
    <div>
      <SectionHeader
        icon={<Settings className="w-6 h-6" />}
        title="الإعدادات"
        subtitle="تخصيص تجربتك في دليلك التعليمي والعملي"
        color={settingsColor}
      />

      <div className="max-w-2xl mx-auto space-y-8">

        {/* المظهر */}
        <div className="neu-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5" style={{ color: settingsColor }} />
            المظهر
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {themes.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`p-4 rounded-[var(--neu-radius-sm)] text-center transition-all ${
                  theme === key ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  background: 'var(--neu-bg)',
                  boxShadow: theme === key ? 'var(--neu-shadow-inset-sm)' : 'var(--neu-shadow-outset-sm)',
                  ...(theme === key ? { ringColor: settingsColor } : {}),
                }}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: theme === key ? settingsColor : undefined }} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* المفضلة */}
        <div className="neu-card p-6">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" style={{ color: settingsColor }} />
            المفضلة
          </h3>
          <p className="text-sm text-second mb-4">
            يتم حفظ مواردك المفضلة تلقائياً في المتصفح وتبقى حتى لو أغلقت الصفحة.
          </p>
        </div>

        {/* البيانات */}
        <div className="neu-card p-6">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Download className="w-5 h-5" style={{ color: settingsColor }} />
            البيانات والإحصائيات
          </h3>
          <p className="text-sm text-second mb-4">
            إجمالي الموارد: <span className="font-bold text-main">{formatNumber(totalResources)}</span> مورداً في {Object.keys(sectionCounts).length} قسم.
          </p>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            تصدير JSON
          </Button>
        </div>

        {/* معلومات التواصل */}
        <div className="neu-card p-6">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" style={{ color: settingsColor }} />
            معلومات التواصل
          </h3>
          <p className="text-sm text-second mb-4">
            للتواصل مع مؤسس المشروع أو اقتراح موارد جديدة:
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="https://t.me/hqjjq6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#229ED9] hover:underline">
              <Send size={14} /> تلجرام
            </a>
            <a href="https://wa.me/message/PXHGS5BKPSB2H1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#25D366] hover:underline">
              <MessageCircle size={14} /> واتس اب
            </a>
            <a href="mailto:alomriosamah82@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#3b82f6] hover:underline">
              <Mail size={14} /> بريد إلكتروني
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
