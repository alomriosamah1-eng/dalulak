import { create } from 'zustand';
import { storage } from '../services/storage';
import type { FavoriteItem } from '../types';

interface FavoritesState {
  favorites: FavoriteItem[];
  loaded: boolean;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string | number) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string | number) => boolean;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loaded: false,

  loadFavorites: async () => {
    const saved = await storage.get<FavoriteItem[]>('favorites', []);
    set({ favorites: saved, loaded: true });
  },

  addFavorite: async (item) => {
    const { favorites } = get();
    const next = [...favorites, item];
    await storage.set('favorites', next);
    set({ favorites: next });
  },

  removeFavorite: async (id) => {
    const { favorites } = get();
    const next = favorites.filter((f) => f.id !== id);
    await storage.set('favorites', next);
    set({ favorites: next });
  },

  toggleFavorite: async (item) => {
    const { favorites } = get();
    const exists = favorites.some((f) => f.id === item.id);
    if (exists) {
      const next = favorites.filter((f) => f.id !== item.id);
      await storage.set('favorites', next);
      set({ favorites: next });
    } else {
      const next = [...favorites, item];
      await storage.set('favorites', next);
      set({ favorites: next });
    }
  },

  isFavorite: (id) => get().favorites.some((f) => f.id === id),
}));
