import { useToastStore } from '../../../store/toastStore';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-success bg-success-soft',
  error: 'border-error bg-error-soft',
  warning: 'border-warning bg-warning-soft',
  info: 'border-info bg-info-soft',
};

const iconColors = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-lg shadow-lg animate-slideDown ${colors[toast.type]}`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${iconColors[toast.type]}`} />
            <p className="flex-1 text-sm text-main font-medium">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="p-0.5 rounded hover:bg-glass">
              <X className="w-4 h-4 text-muted-custom" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
