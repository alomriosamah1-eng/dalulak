import React, { createContext, useContext } from 'react';
import { useThemeStore } from '../../shared/store';

type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  accent: string;
  border: string;
  muted: string;
};

const darkColors: ThemeColors = {
  background: '#0a0a0a',
  surface: '#1a1a2e',
  card: '#16213e',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  primary: '#8B5CF6',
  accent: '#06F7F7',
  border: '#1e293b',
  muted: '#64748b',
};

const lightColors: ThemeColors = {
  background: '#f8fafc',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#0f172a',
  textSecondary: '#475569',
  primary: '#8B5CF6',
  accent: '#0d9488',
  border: '#e2e8f0',
  muted: '#94a3b8',
};

const amoledColors: ThemeColors = {
  background: '#000000',
  surface: '#0a0a0a',
  card: '#111111',
  text: '#ffffff',
  textSecondary: '#888888',
  primary: '#8B5CF6',
  accent: '#00ffff',
  border: '#1a1a1a',
  muted: '#555555',
};

const themeMap: Record<string, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
  amoled: amoledColors,
};

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  const colors = themeMap[theme] || darkColors;
  const isDark = theme !== 'light';

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export type { ThemeColors };
