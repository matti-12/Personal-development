import { create } from 'zustand';

export type NoteFolder = 'Personal' | 'Work' | 'Ideas' | 'Journal' | 'Travel' | 'Learning';

export interface Note {
  id: string;
  title: string;
  content: string;
  folder: NoteFolder;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  wordCount: number;
}

interface NotesState {
  notes: Note[];
  searchQuery: string;
  activeFolder: NoteFolder | 'All';
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'wordCount'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setSearchQuery: (q: string) => void;
  setActiveFolder: (folder: NoteFolder | 'All') => void;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'SaaS Product Vision',
    content:
      '# Product Vision\n\nBuilding a personal OS for ambitious people. The core insight is that most productivity apps are too generic...\n\n## Core Features\n- Smart dashboard\n- AI-powered insights\n- Seamless integrations\n\n## Target User\nAmbitious professionals aged 25-40 who want to build a life they love.',
    folder: 'Work',
    tags: ['startup', 'ideas', 'strategy'],
    isPinned: true,
    isFavorite: true,
    createdAt: '2026-05-10T09:00:00',
    updatedAt: '2026-05-16T14:30:00',
    wordCount: 84,
  },
  {
    id: '2',
    title: 'Morning Routine Optimization',
    content:
      '# Morning Routine\n\n6:00 - Wake up, no phone\n6:05 - Cold shower (3 min)\n6:15 - Meditation (10 min)\n6:30 - Exercise\n7:15 - Journaling\n7:30 - Review goals & priorities\n8:00 - Deep work block',
    folder: 'Personal',
    tags: ['routine', 'productivity', 'health'],
    isPinned: true,
    isFavorite: false,
    createdAt: '2026-04-01T07:00:00',
    updatedAt: '2026-05-12T08:00:00',
    wordCount: 52,
  },
  {
    id: '3',
    title: 'Japan Trip Planning',
    content:
      '# Japan 2026\n\n## Must Visit\n- Shinjuku, Tokyo\n- Arashiyama Bamboo Forest\n- Fushimi Inari Shrine\n- Dotonbori, Osaka\n\n## Food Goals\n- Tsukiji Market ramen\n- Conveyor belt sushi\n- Wagyu in Kyoto',
    folder: 'Travel',
    tags: ['japan', 'travel', '2026'],
    isPinned: false,
    isFavorite: true,
    createdAt: '2026-03-15T19:00:00',
    updatedAt: '2026-05-01T20:00:00',
    wordCount: 61,
  },
  {
    id: '4',
    title: 'Reading Notes: Atomic Habits',
    content:
      '# Atomic Habits — Key Takeaways\n\n1. 1% better every day = 37x better in a year\n2. Systems > Goals\n3. Identity-based habits\n4. Make it obvious, attractive, easy, satisfying\n5. Habit stacking technique',
    folder: 'Learning',
    tags: ['books', 'habits', 'productivity'],
    isPinned: false,
    isFavorite: true,
    createdAt: '2026-02-20T21:00:00',
    updatedAt: '2026-02-22T10:00:00',
    wordCount: 45,
  },
  {
    id: '5',
    title: 'Content Ideas Pipeline',
    content:
      '# YouTube / Content Ideas\n\n## Video Ideas\n- My full personal OS tour\n- How I plan my year\n- Morning routine 2026\n- Tool stack for solopreneurs\n- From 0 to 1K subscribers\n\n## Short Form\n- Quick productivity tips\n- App reviews',
    folder: 'Ideas',
    tags: ['content', 'youtube', 'ideas'],
    isPinned: false,
    isFavorite: false,
    createdAt: '2026-05-05T11:00:00',
    updatedAt: '2026-05-14T16:00:00',
    wordCount: 55,
  },
  {
    id: '6',
    title: 'Weekly Review Template',
    content:
      '# Weekly Review\n\n## What went well?\n\n## What could improve?\n\n## Top 3 wins\n1.\n2.\n3.\n\n## Lessons learned\n\n## Next week priorities\n1.\n2.\n3.',
    folder: 'Personal',
    tags: ['review', 'template', 'weekly'],
    isPinned: false,
    isFavorite: false,
    createdAt: '2026-01-05T09:00:00',
    updatedAt: '2026-05-11T18:00:00',
    wordCount: 42,
  },
];

export const useNotesStore = create<NotesState>((set) => ({
  notes: mockNotes,
  searchQuery: '',
  activeFolder: 'All',
  addNote: (note) =>
    set((state) => ({
      notes: [
        {
          ...note,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          wordCount: note.content.split(' ').length,
        },
        ...state.notes,
      ],
    })),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id
          ? {
              ...n,
              ...updates,
              wordCount: updates.content
                ? updates.content.split(' ').length
                : n.wordCount,
              updatedAt: new Date().toISOString(),
            }
          : n
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  togglePin: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, isPinned: !n.isPinned } : n
      ),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
      ),
    })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveFolder: (activeFolder) => set({ activeFolder }),
}));
