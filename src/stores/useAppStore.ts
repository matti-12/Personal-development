import { create } from 'zustand';

export type ThemeMode = 'dark' | 'light';

interface AppState {
  themeMode: ThemeMode;
  userName: string;
  focusScore: number;
  productivityScore: number;
  todayMood: number | null;
  setThemeMode: (mode: ThemeMode) => void;
  setUserName: (name: string) => void;
  setTodayMood: (mood: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  themeMode: 'dark',
  userName: 'Matti',
  focusScore: 78,
  productivityScore: 82,
  todayMood: null,
  setThemeMode: (mode) => set({ themeMode: mode }),
  setUserName: (name) => set({ userName: name }),
  setTodayMood: (mood) => set({ todayMood: mood }),
}));
