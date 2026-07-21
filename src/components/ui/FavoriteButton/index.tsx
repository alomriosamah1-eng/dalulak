import { useFavoritesStore } from '../../../store/favoritesStore';
import { useToastStore } from '../../../store/toastStore';
import type { FavoriteItem } from '../../../types';

interface FavoriteButtonProps {
  item: FavoriteItem;
}

export default function FavoriteButton({ item }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { addToast } = useToastStore();
  const active = isFavorite(item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item);
    addToast(
      active ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
      active ? 'warning' : 'success'
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
        active
          ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30'
          : 'bg-card text-second hover:bg-glass hover:text-pink-400'
      }`}
      aria-label={active ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
    >
      <svg className={`w-5 h-5 transition-all ${active ? 'fill-pink-400' : ''}`} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
