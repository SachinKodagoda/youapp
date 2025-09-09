export type ZodiacSign =
  | "Rat"
  | "Ox"
  | "Tiger"
  | "Rabbit"
  | "Dragon"
  | "Snake"
  | "Horse"
  | "Goat"
  | "Monkey"
  | "Rooster"
  | "Dog"
  | "Pig";

export type Zodiac = {
  icon: string;
  sign: ZodiacSign;
};

export const zodiacList: Zodiac[] = [
  {
    icon: "🐀",
    sign: "Rat",
  },
  {
    icon: "🐂",
    sign: "Ox",
  },
  {
    icon: "🐅",
    sign: "Tiger",
  },
  {
    icon: "🐰",
    sign: "Rabbit",
  },
  {
    icon: "🐉",
    sign: "Dragon",
  },
  {
    icon: "🐍",
    sign: "Snake",
  },
  {
    icon: "🐎",
    sign: "Horse",
  },
  {
    icon: "🐐",
    sign: "Goat",
  },
  {
    icon: "🐒",
    sign: "Monkey",
  },
  {
    icon: "🐓",
    sign: "Rooster",
  },
  {
    icon: "🐕",
    sign: "Dog",
  },
  {
    icon: "🐖",
    sign: "Pig",
  },
];
