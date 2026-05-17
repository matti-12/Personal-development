import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('lifeos.db');
  await initDatabase(db);
  return db;
}

async function initDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      folder TEXT NOT NULL,
      tags TEXT NOT NULL DEFAULT '[]',
      is_pinned INTEGER NOT NULL DEFAULT 0,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      word_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'medium',
      progress REAL NOT NULL DEFAULT 0,
      target REAL NOT NULL DEFAULT 100,
      unit TEXT NOT NULL DEFAULT '%',
      deadline TEXT,
      color TEXT NOT NULL DEFAULT '#7C5CF8',
      streak INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS milestones (
      id TEXT PRIMARY KEY,
      goal_id TEXT NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      due_date TEXT,
      FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      emoji TEXT NOT NULL DEFAULT '✅',
      color TEXT NOT NULL DEFAULT '#7C5CF8',
      frequency TEXT NOT NULL DEFAULT 'daily',
      streak INTEGER NOT NULL DEFAULT 0,
      longest_streak INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS habit_completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id TEXT NOT NULL,
      completed_date TEXT NOT NULL,
      FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
      UNIQUE(habit_id, completed_date)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      priority TEXT NOT NULL DEFAULT 'medium',
      due_date TEXT,
      goal_id TEXT,
      is_recurring INTEGER NOT NULL DEFAULT 0,
      recurring_pattern TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS journal_entries (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL UNIQUE,
      mood INTEGER NOT NULL DEFAULT 5,
      energy INTEGER NOT NULL DEFAULT 5,
      wins TEXT NOT NULL DEFAULT '[]',
      lessons TEXT NOT NULL DEFAULT '[]',
      gratitude TEXT NOT NULL DEFAULT '[]',
      content TEXT,
      productivity INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);
}

export async function saveNote(note: {
  id: string;
  title: string;
  content: string;
  folder: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}) {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO notes (id, title, content, folder, tags, is_pinned, is_favorite, word_count, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      note.id, note.title, note.content, note.folder,
      JSON.stringify(note.tags), note.isPinned ? 1 : 0,
      note.isFavorite ? 1 : 0, note.wordCount, note.createdAt, note.updatedAt,
    ]
  );
}

export async function getAllNotes() {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{
    id: string; title: string; content: string; folder: string; tags: string;
    is_pinned: number; is_favorite: number; word_count: number;
    created_at: string; updated_at: string;
  }>('SELECT * FROM notes ORDER BY is_pinned DESC, updated_at DESC');

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    folder: row.folder,
    tags: JSON.parse(row.tags) as string[],
    isPinned: row.is_pinned === 1,
    isFavorite: row.is_favorite === 1,
    wordCount: row.word_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}
