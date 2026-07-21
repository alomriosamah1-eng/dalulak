import { Moon, Sun, Monitor } from 'lucide-react';
import { useThemeStore } from '../../../store/themeStore';

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const themes: { key: string; icon: React.ReactNode; label: string }[] = [
    { key: 'dark', icon: <Moon className="w-4 h-4 md:w-5 md:h-5" />, label: 'داكن' },
    { key: 'light', icon: <Sun className="w-4 h-4 md:w-5 md:h-5" />, label: 'فاتح' },
    { key: 'amoled', icon: <Monitor className="w-4 h-4 md:w-5 md:h-5" />, label: 'أموليد' },
  ];

  const currentIndex = themes.findIndex(t => t.key === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  return (
    <button
      onClick={() => setTheme(nextTheme.key as 'dark' | 'light' | 'amoled')}
      className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl text-second hover:text-main transition-all"
      style={{
        background: 'var(--neu-bg)',
        boxShadow: 'var(--neu-shadow-outset-sm)',
      }}
      aria-label={`السمة: ${nextTheme.label}`}
      title={`السمة: ${nextTheme.label}`}
    >
      {themes.find(t => t.key === theme)?.icon}
    </button>
  );
}
