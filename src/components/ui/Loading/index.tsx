interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'جاري التحميل...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: 'var(--color-primary-soft)' }} />
        <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" style={{ borderTopColor: 'var(--color-primary)' }} />
      </div>
      <p className="text-second text-sm font-medium">{message}</p>
    </div>
  );
}
