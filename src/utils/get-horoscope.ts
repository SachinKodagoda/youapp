import { HoroscopeInfo, horoscopeList } from "@/data/horoscope-list";

export function getHoroscope(month: number, day: number): HoroscopeInfo {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return horoscopeList[0]; // Aries
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return horoscopeList[1]; // Taurus
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return horoscopeList[2]; // Gemini
  }
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return horoscopeList[3]; // Cancer
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return horoscopeList[4]; // Leo
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return horoscopeList[5]; // Virgo
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    return horoscopeList[6]; // Libra
  }
  if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
    return horoscopeList[7]; // Scorpio
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return horoscopeList[8]; // Sagittarius
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return horoscopeList[9]; // Capricorn
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return horoscopeList[10]; // Aquarius
  }
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return horoscopeList[11]; // Pisces
  }

  return {
    dateRange: "Unknown",
    element: "Unknown",
    modality: "Unknown",
    sign: "Unknown",
    symbol: "Unknown",
    traits: [],
  };
}
