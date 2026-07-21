import { Heart, Trash2 } from 'lucide-react';
import { Modal, EmptyState, Icon } from '../../ui';
import { useFavoritesStore } from '../../../store/favoritesStore';
import type { SectionId } from '../../../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

function getSectionLabel(section: string): string {
  const labels: Record<string, string> = {
    learning: 'منصات تعليم',
    youtube: 'يوتيوب',
    work: 'عمل',
    tools: 'أدوات',
    tests: 'اختبارات',
  };
  return labels[section] || section;
}

function getSectionColor(section: string): string {
  const colors: Record<string, string> = {
    learning: '#3B82F6',
    youtube: '#F43F5E',
    work: '#10B981',
    tools: '#F59E0B',
    tests: '#8B5CF6',
  };
  return colors[section] || '#3B82F6';
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, removeFavorite } = useFavoritesStore();

  const handleRemove = (id: string | number) => {
    removeFavorite(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="قائمة المفضلة" size="md">
      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-8 h-8 text-muted-custom" />}
          title="لا توجد عناصر في المفضلة بعد"
          description="أضف مواردك المفضلة من الأقسام المختلفة"
        />
      ) : (
        <div className="space-y-2">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center gap-4 p-4 rounded-[var(--neu-radius-sm)] transition-all group"
              style={{
                background: 'var(--neu-bg)',
                boxShadow: 'var(--neu-shadow-outset-sm)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${getSectionColor(fav.section)}15` }}
              >
                <Icon name={fav.logoUrl} className="w-5 h-5" color={getSectionColor(fav.section)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-main text-sm truncate">{fav.name}</p>
                <p className="text-xs text-muted-custom">{fav.category || ''} - {getSectionLabel(fav.section)}</p>
              </div>
              <button
                onClick={() => handleRemove(fav.id)}
                className="p-2 rounded-lg text-muted-custom hover:text-pink-400 hover:bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
