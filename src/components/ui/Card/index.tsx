import { cn } from '../../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accentColor?: string;
}

export default function Card({ children, className, hover = true, accentColor }: CardProps) {
  return (
    <div
      className={cn(
        'neu-card',
        hover && 'hover:-translate-y-1',
        className
      )}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 w-full h-1 rounded-t-[var(--neu-radius)] transition-transform duration-300 origin-right scale-x-0 group-hover:scale-x-100"
          style={{ backgroundColor: accentColor }}
        />
      )}
      {children}
    </div>
  );
}
