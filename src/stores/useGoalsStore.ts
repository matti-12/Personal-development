import { create } from 'zustand';

export type GoalCategory =
  | 'Business'
  | 'Career'
  | 'Fitness'
  | 'Financial'
  | 'Learning'
  | 'Travel'
  | 'Personal'
  | 'Content';

export type GoalPriority = 'high' | 'medium' | 'low';

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  milestones: Milestone[];
  color: string;
  streak: number;
  createdAt: string;
  updatedAt: string;
}

interface GoalsState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Launch SaaS Product',
    description: 'Build and launch the MVP for my productivity SaaS',
    category: 'Business',
    priority: 'high',
    progress: 65,
    target: 100,
    unit: '%',
    deadline: '2026-08-01',
    color: '#7C5CF8',
    streak: 12,
    milestones: [
      { id: 'm1', title: 'Market research', completed: true },
      { id: 'm2', title: 'MVP design', completed: true },
      { id: 'm3', title: 'Core features built', completed: false },
      { id: 'm4', title: 'Beta testing', completed: false },
      { id: 'm5', title: 'Public launch', completed: false },
    ],
    createdAt: '2026-01-01',
    updatedAt: '2026-05-15',
  },
  {
    id: '2',
    title: 'Run a Marathon',
    description: 'Complete my first full marathon',
    category: 'Fitness',
    priority: 'high',
    progress: 42,
    target: 42,
    unit: 'km trained',
    deadline: '2026-10-15',
    color: '#5CF8C8',
    streak: 8,
    milestones: [
      { id: 'm1', title: '5K comfortable', completed: true },
      { id: 'm2', title: '10K completed', completed: true },
      { id: 'm3', title: 'Half marathon', completed: false },
      { id: 'm4', title: 'Full 42km', completed: false },
    ],
    createdAt: '2026-02-01',
    updatedAt: '2026-05-16',
  },
  {
    id: '3',
    title: 'Save €20,000',
    description: 'Emergency fund + investment seed',
    category: 'Financial',
    priority: 'high',
    progress: 12400,
    target: 20000,
    unit: '€',
    deadline: '2026-12-31',
    color: '#F8A85C',
    streak: 30,
    milestones: [
      { id: 'm1', title: '€5,000 saved', completed: true },
      { id: 'm2', title: '€10,000 saved', completed: true },
      { id: 'm3', title: '€15,000 saved', completed: false },
      { id: 'm4', title: '€20,000 goal reached', completed: false },
    ],
    createdAt: '2026-01-01',
    updatedAt: '2026-05-17',
  },
  {
    id: '4',
    title: 'Read 24 Books',
    description: '2 books per month this year',
    category: 'Learning',
    priority: 'medium',
    progress: 9,
    target: 24,
    unit: 'books',
    deadline: '2026-12-31',
    color: '#5C9CF8',
    streak: 5,
    milestones: [
      { id: 'm1', title: 'First 6 books', completed: true },
      { id: 'm2', title: '12 books mid-year', completed: false },
      { id: 'm3', title: '18 books', completed: false },
      { id: 'm4', title: '24 books complete', completed: false },
    ],
    createdAt: '2026-01-01',
    updatedAt: '2026-05-10',
  },
  {
    id: '5',
    title: 'Visit Japan',
    description: 'Two-week trip to Tokyo, Kyoto, Osaka',
    category: 'Travel',
    priority: 'medium',
    progress: 30,
    target: 100,
    unit: '%',
    deadline: '2026-11-01',
    color: '#F85CC8',
    streak: 0,
    milestones: [
      { id: 'm1', title: 'Research & itinerary', completed: true },
      { id: 'm2', title: 'Book flights', completed: false },
      { id: 'm3', title: 'Book accommodation', completed: false },
      { id: 'm4', title: 'Pack & depart', completed: false },
    ],
    createdAt: '2026-03-01',
    updatedAt: '2026-05-01',
  },
];

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: mockGoals,
  addGoal: (goal) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          ...goal,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
  updateGoal: (id, updates) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g
      ),
    })),
  deleteGoal: (id) =>
    set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
  updateProgress: (id, progress) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, progress, updatedAt: new Date().toISOString() } : g
      ),
    })),
  toggleMilestone: (goalId, milestoneId) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              milestones: g.milestones.map((m) =>
                m.id === milestoneId ? { ...m, completed: !m.completed } : m
              ),
            }
          : g
      ),
    })),
}));
