import { useScrollToTop } from '../../../hooks';
import { cn } from '../../../utils/cn';

export default function BackToTop() {
  const { visible, scrollToTop } = useScrollToTop();

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-20 md:bottom-8 left-4 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 md:block',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}
      style={{
        background: 'var(--gradient-primary)',
        boxShadow: 'var(--shadow-glow-primary)',
      }}
      aria-label="العودة إلى الأعلى"
    >
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
