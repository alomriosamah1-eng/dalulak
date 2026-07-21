import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-glass flex items-center justify-center mb-4">
        {icon || <Inbox className="w-8 h-8 text-muted-custom" />}
      </div>
      <h3 className="text-lg font-bold text-second mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-custom">{description}</p>}
    </div>
  );
}
