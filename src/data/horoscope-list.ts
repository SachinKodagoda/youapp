export interface HoroscopeInfo {
  dateRange: string;
  element: "fire" | "earth" | "air" | "water" | "Unknown";
  modality: "cardinal" | "fixed" | "mutable" | "Unknown";
  symbol: string;
  sign: string;
  traits: string[];
}
export const horoscopeList: HoroscopeInfo[] = [
  {
    dateRange: "March 21 - April 19",
    element: "fire",
    modality: "cardinal",
    sign: "Aries",
    symbol: "Ram",
    traits: ["energetic", "courageous", "impulsive"],
  },
  {
    dateRange: "April 20 - May 20",
    element: "earth",
    modality: "fixed",
    sign: "Taurus",
    symbol: "Bull",
    traits: ["reliable", "practical", "stubborn"],
  },
  {
    dateRange: "May 21 - June 21",
    element: "air",
    modality: "mutable",
    sign: "Gemini",
    symbol: "Twins",
    traits: ["curious", "quick-witted", "inconsistent"],
  },
  {
    dateRange: "June 22 - July 22",
    element: "water",
    modality: "cardinal",
    sign: "Cancer",
    symbol: "Crab",
    traits: ["loyal", "protective", "moody"],
  },
  {
    dateRange: "July 23 - August 22",
    element: "fire",
    modality: "fixed",
    sign: "Leo",
    symbol: "Lion",
    traits: ["creative", "generous", "domineering"],
  },
  {
    dateRange: "August 23 - September 22",
    element: "earth",
    modality: "mutable",
    sign: "Virgo",
    symbol: "Virgin",
    traits: ["analytical", "hardworking", "critical"],
  },
  {
    dateRange: "September 23 - October 23",
    element: "air",
    modality: "cardinal",
    sign: "Libra",
    symbol: "Balance",
    traits: ["diplomatic", "cooperative", "indecisive"],
  },
  {
    dateRange: "October 24 - November 21",
    element: "water",
    modality: "fixed",
    sign: "Scorpio",
    symbol: "Scorpion",
    traits: ["passionate", "resourceful", "jealous"],
  },
  {
    dateRange: "November 22 - December 21",
    element: "fire",
    modality: "mutable",
    sign: "Sagittarius",
    symbol: "Archer",
    traits: ["adventurous", "honest", "tactless"],
  },
  {
    dateRange: "December 22 - January 19",
    element: "earth",
    modality: "cardinal",
    sign: "Capricorn",
    symbol: "Goat",
    traits: ["disciplined", "responsible", "unforgiving"],
  },
  {
    dateRange: "January 20 - February 18",
    element: "air",
    modality: "fixed",
    sign: "Aquarius",
    symbol: "Water Bearer",
    traits: ["independent", "intellectual", "detached"],
  },
  {
    dateRange: "February 19 - March 20",
    element: "water",
    modality: "mutable",
    sign: "Pisces",
    symbol: "Fish",
    traits: ["artistic", "compassionate", "escapist"],
  },
];
