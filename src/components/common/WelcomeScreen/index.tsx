import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  const handleStart = () => {
    setVisible(false);
    setTimeout(onStart, 300);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Ambient decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div className="absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <div className="absolute top-1/3 left-1/2 w-1/3 h-1/3 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,247,247,0.04) 0%, transparent 50%)',
            animation: 'float 12s ease-in-out infinite 2s',
          }}
        />
      </div>

      <div className="relative text-center px-6 py-10 max-w-lg mx-auto animate-scaleInBounce">
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-[var(--radius-xl)] flex items-center justify-center relative"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-xl), var(--shadow-glow-primary)',
              animation: 'glow 3s ease-in-out infinite',
            }}
          >
            <GraduationCap className="w-14 h-14 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text-primary"
          style={{ filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.3))' }}
        >
          دليلك التعليمي والعملي
        </h1>

        <p className="text-xl font-medium mb-8" style={{ color: 'var(--color-primary)', opacity: 0.8 }}>
          ابدأ رحلتك التعليمية والعملية الآن
        </p>

        <button
          onClick={handleStart}
          className="relative px-12 py-4 rounded-full text-xl font-bold text-white overflow-hidden group"
          style={{
            background: 'var(--gradient-primary)',
            boxShadow: 'var(--shadow-xl), var(--shadow-glow-primary)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 50px rgba(59,130,246,0.6), 0 0 100px rgba(99,102,241,0.3)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-xl), var(--shadow-glow-primary)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span className="relative z-10">ابدأ الآن</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, #6366F1, #3B82F6)' }}
          />
        </button>

        <p className="mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          هدية من المهندس أسامة العُمري - هاتف 711666863
        </p>
      </div>
    </div>
  );
}
