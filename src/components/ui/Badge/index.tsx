import { cn } from '../../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const colorMap = {
  default: 'bg-glass text-second border-glass',
  success: 'bg-success-soft text-success border-success/30',
  warning: 'bg-warning-soft text-warning border-warning/30',
  danger: 'bg-error-soft text-error border-error/30',
  info: 'bg-info-soft text-info border-info/30',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm',
        colorMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
