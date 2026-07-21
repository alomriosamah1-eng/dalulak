import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[var(--neu-radius-sm)] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] focus-visible:ring-primary': variant === 'primary',
            'neu-button border-0': variant === 'secondary',
            'border-2 border-primary/50 text-primary hover:bg-primary-soft active:bg-primary-soft/80': variant === 'outline',
            'text-second hover:text-main hover:bg-glass active:bg-glass': variant === 'ghost',
            'bg-error-soft border border-error/30 text-error hover:bg-error-soft/80 active:bg-error-soft': variant === 'danger',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-base': size === 'md',
            'px-7 py-3 text-lg': size === 'lg',
          },
          className
        )}
        style={variant === 'primary' ? { background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' } : undefined}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
