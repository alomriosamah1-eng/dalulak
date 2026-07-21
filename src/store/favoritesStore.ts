import { create } from 'zustand';
import { storage } from '../services/storage';
import type { FavoriteItem } from '../types';

interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string | number) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string | number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: storage.get<FavoriteItem[]>('favorites', []),
  addFavorite: (item) =>
    set((state) => {
      const next = [...state.favorites, item];
      storage.set('favorites', next);
      return { favorites: next };
    }),
  removeFavorite: (id) =>
    set((state) => {
      const next = state.favorites.filter((f) => f.id !== id);
      storage.set('favorites', next);
      return { favorites: next };
    }),
  toggleFavorite: (item) => {
    const { favorites } = get();
    const exists = favorites.some((f) => f.id === item.id);
    if (exists) {
      set((state) => {
        const next = state.favorites.filter((f) => f.id !== item.id);
        storage.set('favorites', next);
        return { favorites: next };
      });
    } else {
      set((state) => {
        const next = [...state.favorites, item];
        storage.set('favorites', next);
        return { favorites: next };
      });
    }
  },
  isFavorite: (id) => get().favorites.some((f) => f.id === id),
}));
