import { MONTH_SHORT } from "./constants";

const TILTED_WEEKS = new Set([
  1, 3, 5, 8, 11, 14, 18, 21, 25, 28, 32, 35, 38, 42, 46, 49,
]);

export function parseUTC(dateStr: string): Date | null {
  if (!dateStr) return null;
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? `${dateStr}T00:00:00Z`
    : dateStr;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDayLabel(dateStr: string): string {
  const d = parseUTC(dateStr);
  if (!d) return "No data";
  return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatRangeShort(startStr: string, endStr: string): string {
  const start = parseUTC(startStr);
  const end = parseUTC(endStr);
  if (!start || !end) return `${startStr} – ${endStr}`;
  const sm = MONTH_SHORT[start.getUTCMonth()];
  const em = MONTH_SHORT[end.getUTCMonth()];
  const sd = start.getUTCDate();
  const ed = end.getUTCDate();
  return sm === em ? `${sm} ${sd} – ${ed}` : `${sm} ${sd} – ${em} ${ed}`;
}

export function formatRangeLong(startStr: string, endStr: string): string {
  const start = parseUTC(startStr);
  const end = parseUTC(endStr);
  if (!start || !end) return `${startStr} – ${endStr}`;
  const s = `${MONTH_SHORT[start.getUTCMonth()]} ${start.getUTCDate()}, ${start.getUTCFullYear()}`;
  const e = `${MONTH_SHORT[end.getUTCMonth()]} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  return `${s} – ${e}`;
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

export function rotationForWeek(weekNumber: number): number {
  if (!TILTED_WEEKS.has(weekNumber)) return 0;
  return weekNumber % 2 === 1 ? 5 : -5;
}

export function levelIndex(count: number): number {
  if (count >= 10) return 4;
  if (count >= 6) return 3;
  if (count >= 3) return 2;
  if (count >= 1) return 1;
  return 0;
}

export function weeklyLevelIndex(commits: number, heat: number): number {
  if (commits === 0) return 0;
  if (heat >= 75 || commits >= 100) return 4;
  if (heat >= 50 || commits >= 50) return 3;
  if (heat >= 25 || commits >= 20) return 2;
  return 1;
}
