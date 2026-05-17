import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

export function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name} ☀️`;
  if (hour < 17) return `Good afternoon, ${name} 👋`;
  return `Good evening, ${name} 🌙`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d');
}

export function formatDateFull(dateStr: string): string {
  return format(new Date(dateStr), 'EEEE, MMMM d');
}

export function formatRelative(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDaysUntil(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days} days`;
}

export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getWeekDates(): string[] {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    dates.push(format(d, 'yyyy-MM-dd'));
  }
  return dates;
}

export function getMonthDates(): string[] {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    dates.push(format(d, 'yyyy-MM-dd'));
  }
  return dates;
}
