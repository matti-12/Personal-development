import { create } from 'zustand';
import { format } from 'date-fns';

export interface Habit {
  id: string;
  title: string;
  emoji: string;
  color: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  longestStreak: number;
  completedDates: string[];
  targetDays?: number[];
  createdAt: string;
}

interface HabitsState {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'longestStreak'>) => void;
  toggleHabitToday: (id: string) => void;
  deleteHabit: (id: string) => void;
}

const today = format(new Date(), 'yyyy-MM-dd');
const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
const twoDaysAgo = format(new Date(Date.now() - 2 * 86400000), 'yyyy-MM-dd');

const mockHabits: Habit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    emoji: '🧘',
    color: '#7C5CF8',
    frequency: 'daily',
    streak: 14,
    longestStreak: 21,
    completedDates: [today, yesterday, twoDaysAgo],
    createdAt: '2026-01-01',
  },
  {
    id: '2',
    title: 'Exercise',
    emoji: '💪',
    color: '#5CF8C8',
    frequency: 'daily',
    streak: 8,
    longestStreak: 15,
    completedDates: [yesterday, twoDaysAgo],
    createdAt: '2026-01-01',
  },
  {
    id: '3',
    title: 'Read 30 min',
    emoji: '📚',
    color: '#5C9CF8',
    frequency: 'daily',
    streak: 5,
    longestStreak: 12,
    completedDates: [today, yesterday],
    createdAt: '2026-02-01',
  },
  {
    id: '4',
    title: 'No Sugar',
    emoji: '🚫',
    color: '#F8A85C',
    frequency: 'daily',
    streak: 3,
    longestStreak: 7,
    completedDates: [today, yesterday, twoDaysAgo],
    createdAt: '2026-04-01',
  },
  {
    id: '5',
    title: 'Journal',
    emoji: '✍️',
    color: '#F85CC8',
    frequency: 'daily',
    streak: 21,
    longestStreak: 21,
    completedDates: [today, yesterday, twoDaysAgo],
    createdAt: '2026-01-01',
  },
  {
    id: '6',
    title: 'Cold Shower',
    emoji: '🚿',
    color: '#5CF8E8',
    frequency: 'daily',
    streak: 6,
    longestStreak: 10,
    completedDates: [today, yesterday],
    createdAt: '2026-03-01',
  },
];

export const useHabitsStore = create<HabitsState>((set) => ({
  habits: mockHabits,
  addHabit: (habit) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          ...habit,
          id: Date.now().toString(),
          streak: 0,
          longestStreak: 0,
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  toggleHabitToday: (id) =>
    set((state) => ({
      habits: state.habits.map((h) => {
        if (h.id !== id) return h;
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        const isCompleted = h.completedDates.includes(todayStr);
        const completedDates = isCompleted
          ? h.completedDates.filter((d) => d !== todayStr)
          : [...h.completedDates, todayStr];
        const streak = isCompleted ? Math.max(0, h.streak - 1) : h.streak + 1;
        return {
          ...h,
          completedDates,
          streak,
          longestStreak: Math.max(h.longestStreak, streak),
        };
      }),
    })),
  deleteHabit: (id) =>
    set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),
}));
