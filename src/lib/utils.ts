import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date: string | Date,
  { showDate = true }: { showDate?: boolean } = {},
): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = showDate
    ? { year: "numeric", month: "2-digit", day: "2-digit" }
    : { year: "numeric", month: "2-digit" };

  return d.toLocaleDateString("en-GB", options);
};

export const formatDuration = (start: string, end?: string): string => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const diffInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;

  if (years > 0 && months > 0) {
    return `${years}y ${months}mon`;
  } else if (years > 0) {
    return `${years}y`;
  } else {
    return `${months} mon`;
  }
};
