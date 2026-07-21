import { useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'var(--surface-overlay)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={cn(
          'w-full animate-modalIn overflow-hidden',
          { 'max-w-md': size === 'sm', 'max-w-2xl': size === 'md', 'max-w-4xl': size === 'lg' }
        )}
        style={{
          background: 'var(--neu-bg)',
          borderRadius: 'var(--neu-radius)',
          boxShadow: 'var(--neu-shadow-outset-lg), 0 0 40px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--glass-border)' }}>
          <h3 className="text-xl font-bold text-main">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-glass transition-colors">
            <X className="w-5 h-5 text-second" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
