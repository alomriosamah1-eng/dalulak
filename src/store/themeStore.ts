import { create } from 'zustand';
import { storage } from '../services/storage';

export type Theme = 'dark' | 'light' | 'amoled';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const THEME_CYCLE: Theme[] = ['dark', 'light', 'amoled'];

export const useThemeStore = create<ThemeState>((set) => ({
  theme: storage.get<Theme>('theme', 'dark'),
  setTheme: (theme) => {
    storage.set('theme', theme);
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const idx = THEME_CYCLE.indexOf(state.theme);
      const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
      storage.set('theme', next);
      return { theme: next };
    }),
}));
