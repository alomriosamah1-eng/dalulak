import { Search, Home, Settings } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { SectionId } from '../../../types';

interface BottomNavProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenSearch?: () => void;
}

export default function BottomNav({ activeSection, onNavigate, onOpenSearch }: BottomNavProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-bottom"
      style={{
        background: 'var(--neu-bg)',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-1">
        <button
          onClick={() => onOpenSearch?.()}
          className="flex flex-col items-center gap-0.5 px-6 py-2 rounded-[var(--neu-radius-sm)] transition-all duration-200 text-second"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">بحث</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className={cn(
            'flex flex-col items-center gap-0.5 px-6 py-2 rounded-[var(--neu-radius-sm)] transition-all duration-200',
            activeSection === 'dashboard' ? 'text-primary' : 'text-second'
          )}
          style={activeSection === 'dashboard'
            ? { background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }
            : {}
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">الرئيسية</span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className={cn(
            'flex flex-col items-center gap-0.5 px-6 py-2 rounded-[var(--neu-radius-sm)] transition-all duration-200',
            activeSection === 'settings' ? 'text-primary' : 'text-second'
          )}
          style={activeSection === 'settings'
            ? { background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }
            : {}
          }
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-medium">الإعدادات</span>
        </button>
      </div>
    </nav>
  );
}
