import { create } from 'zustand';

export interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  wins: string[];
  lessons: string[];
  gratitude: string[];
  content: string;
  productivity: number;
  createdAt: string;
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2026-05-16',
    mood: 8,
    energy: 7,
    wins: ['Completed the app wireframes', 'Had a great morning run', 'Called dad'],
    lessons: ['Start deep work earlier — mornings are best', 'Batch similar tasks'],
    gratitude: ['Good health', 'Amazing coffee this morning', 'Sunshine'],
    content:
      'Solid productive day. Got a lot done on the project. Feeling momentum building.',
    productivity: 82,
    createdAt: '2026-05-16T22:00:00',
  },
  {
    id: '2',
    date: '2026-05-15',
    mood: 7,
    energy: 6,
    wins: ['Finished chapter 3 of book', 'Gym session done', '3 sales calls'],
    lessons: ['Need to protect calendar more aggressively'],
    gratitude: ['Good team', 'Progress on goals', 'Beautiful morning'],
    content: 'Decent day. Tired but pushed through. Sleep earlier tonight.',
    productivity: 70,
    createdAt: '2026-05-15T21:30:00',
  },
  {
    id: '3',
    date: '2026-05-14',
    mood: 9,
    energy: 9,
    wins: ['Launched new feature', 'First 10 beta users signed up', 'PB on 5K run'],
    lessons: ['Ship fast, iterate — overthinking kills momentum'],
    gratitude: ['Energy today was incredible', 'Supportive community', 'Progress'],
    content: 'Best day in a while. Everything clicked. More days like this.',
    productivity: 94,
    createdAt: '2026-05-14T22:30:00',
  },
];

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: mockEntries,
  addEntry: (entry) =>
    set((state) => ({
      entries: [
        {
          ...entry,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
        ...state.entries,
      ],
    })),
  updateEntry: (id, updates) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),
  getEntryByDate: (date) => get().entries.find((e) => e.date === date),
}));
