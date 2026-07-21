import { useRef } from 'react';
import { X } from 'lucide-react';
import { Icon } from '../../ui';
import { SECTIONS } from '../../../app/config/constants';
import type { SectionId } from '../../../types';
import { cn } from '../../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  activeSection: SectionId;
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

export default function Sidebar({ isOpen, activeSection, onClose, onNavigate }: SidebarProps) {
  const pointerRef = useRef({ startX: 0, startY: 0, isDragging: false });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onPointerDown={(e) => {
            pointerRef.current = { startX: e.clientX, startY: e.clientY, isDragging: false };
          }}
          onPointerMove={(e) => {
            if (pointerRef.current.startX !== 0) {
              const dx = Math.abs(e.clientX - pointerRef.current.startX);
              const dy = Math.abs(e.clientY - pointerRef.current.startY);
              if (dx > 5 || dy > 5) pointerRef.current.isDragging = true;
            }
          }}
          onPointerUp={() => {
            if (!pointerRef.current.isDragging) onClose();
            pointerRef.current = { startX: 0, startY: 0, isDragging: false };
          }}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-72 md:w-80 transition-all duration-300 lg:translate-x-0 lg:static lg:z-auto text-main',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          background: 'var(--neu-bg)',
          boxShadow: 'var(--neu-shadow-outset)',
        }}
      >
        <div className="flex items-center justify-between p-4"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <h5 className="text-white font-bold text-base">القائمة الرئيسية</h5>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-73px)]">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onNavigate(section.id);
                onClose();
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3.5 rounded-[var(--neu-radius-sm)] text-sm font-semibold transition-all duration-200 text-right',
                activeSection === section.id
                  ? 'text-main'
                  : 'text-second hover:text-main'
              )}
              style={activeSection === section.id
                ? { borderRight: `3px solid ${section.color}`, background: 'var(--neu-bg)', boxShadow: 'var(--neu-shadow-inset-sm)' }
                : { background: 'transparent' }
              }
            >
              <Icon name={section.icon} className="w-5 h-5" color={section.color} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
