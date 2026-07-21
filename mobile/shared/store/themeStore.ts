import { create } from 'zustand';
import { storage } from '../services/storage';

export type Theme = 'dark' | 'light' | 'amoled';

interface ThemeState {
  theme: Theme;
  loaded: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  loadTheme: () => Promise<void>;
}

const THEME_CYCLE: Theme[] = ['dark', 'light', 'amoled'];

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  loaded: false,

  loadTheme: async () => {
    const saved = await storage.get<Theme>('theme', 'dark');
    set({ theme: saved, loaded: true });
  },

  setTheme: async (theme) => {
    await storage.set('theme', theme);
    set({ theme });
  },

  toggleTheme: async () => {
    const { theme } = get();
    const idx = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    await storage.set('theme', next);
    set({ theme: next });
  },
}));
