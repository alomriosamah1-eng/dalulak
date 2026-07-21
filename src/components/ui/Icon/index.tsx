import * as LucideIcons from 'lucide-react';
import { cn } from '../../../utils/cn';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, className, size = 20, color }: IconProps) {
  const LucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>>)[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={cn('shrink-0', className)} size={size} style={color ? { color } : undefined} />;
}
