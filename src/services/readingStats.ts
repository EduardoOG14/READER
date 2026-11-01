import { Preferences } from '@capacitor/preferences';
import type { ReadingStats } from '../types';

const STORAGE_KEY_STATS = 'reader_reading_stats_v1';

export const DEFAULT_STATS: ReadingStats = {
  currentStreak: 0,
  bestStreak: 0,
  lastReadDate: undefined,
  totalMinutes: 0,
  totalPagesRead: 0,
  dailyGoalMinutes: 20,
  sessions: {},
};

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getReadingStats(): Promise<ReadingStats> {
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_STATS });
    if (res && res.value) {
      const parsed: ReadingStats = JSON.parse(res.value);
      return { ...DEFAULT_STATS, ...parsed };
    }
  } catch (e) {
    console.warn('[ReadingStats] Preferences read warning:', e);
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (raw) {
      const parsed: ReadingStats = JSON.parse(raw);
      return { ...DEFAULT_STATS, ...parsed };
    }
  } catch {}

  return { ...DEFAULT_STATS };
}

export async function saveReadingStats(stats: ReadingStats): Promise<void> {
  const json = JSON.stringify(stats);
  try {
    await Preferences.set({ key: STORAGE_KEY_STATS, value: json });
  } catch (e) {
    console.warn('[ReadingStats] Preferences write warning:', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY_STATS, json);
  } catch {}
}

export async function recordReadingTime(minutes: number, pagesDelta = 0): Promise<ReadingStats> {
  const stats = await getReadingStats();
  const today = getTodayString();
  const yesterday = getYesterdayString();

  // 1. Update session for today
  const currentSession = stats.sessions[today] || { date: today, minutes: 0, pagesRead: 0 };
  currentSession.minutes += minutes;
  currentSession.pagesRead += Math.max(0, pagesDelta);
  stats.sessions[today] = currentSession;

  // 2. Update totals
  stats.totalMinutes += minutes;
  stats.totalPagesRead += Math.max(0, pagesDelta);

  // 3. Update streak
  if (stats.lastReadDate !== today) {
    if (stats.lastReadDate === yesterday) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }
    stats.lastReadDate = today;
  }

  if (stats.currentStreak > stats.bestStreak) {
    stats.bestStreak = stats.currentStreak;
  }

  await saveReadingStats(stats);
  return stats;
}

export async function setDailyGoal(minutes: number): Promise<ReadingStats> {
  const stats = await getReadingStats();
  stats.dailyGoalMinutes = Math.max(5, Math.min(300, minutes));
  await saveReadingStats(stats);
  return stats;
}
