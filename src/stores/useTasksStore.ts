import { create } from 'zustand';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: string;
  goalId?: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  isRecurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
}

const today = new Date().toISOString().split('T')[0];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Finalize MVP feature list',
    completed: false,
    priority: 'high',
    dueDate: today,
    goalId: '1',
    subtasks: [
      { id: 's1', title: 'Review competitor features', completed: true },
      { id: 's2', title: 'User interview insights', completed: false },
    ],
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '5km morning run',
    completed: false,
    priority: 'high',
    dueDate: today,
    goalId: '2',
    subtasks: [],
    isRecurring: true,
    recurringPattern: 'daily',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Read 30 pages — Atomic Habits',
    completed: true,
    priority: 'medium',
    dueDate: today,
    goalId: '4',
    subtasks: [],
    isRecurring: true,
    recurringPattern: 'daily',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Weekly review & planning session',
    completed: false,
    priority: 'high',
    dueDate: today,
    subtasks: [
      { id: 's1', title: 'Review last week', completed: false },
      { id: 's2', title: 'Set next week priorities', completed: false },
    ],
    isRecurring: true,
    recurringPattern: 'weekly',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Research Japan accommodation options',
    completed: false,
    priority: 'low',
    dueDate: today,
    goalId: '5',
    subtasks: [],
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Transfer €500 to savings',
    completed: true,
    priority: 'medium',
    dueDate: today,
    goalId: '3',
    subtasks: [],
    isRecurring: true,
    recurringPattern: 'monthly',
    createdAt: new Date().toISOString(),
  },
];

export const useTasksStore = create<TasksState>((set) => ({
  tasks: mockTasks,
  addTask: (task) =>
    set((state) => ({
      tasks: [
        { ...task, id: Date.now().toString(), createdAt: new Date().toISOString() },
        ...state.tasks,
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  toggleSubtask: (taskId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, completed: !s.completed } : s
              ),
            }
          : t
      ),
    })),
}));
