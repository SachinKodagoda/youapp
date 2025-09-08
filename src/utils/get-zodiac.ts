import { Zodiac, zodiacList } from "@/data/zodiac-list";

/**
 * Chinese zodiac (simple version — Jan 1 boundary).
 * For births near late Jan/Feb, we need a Chinese New Year lookup.
 */
export function getZodiac(year: number): Zodiac {
  const index = (year - 1984) % 12; // 1984 was a Rat year
  return zodiacList[(index + 12) % 12];
}
