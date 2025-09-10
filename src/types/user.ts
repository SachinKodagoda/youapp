import { ObjectId } from "mongodb";

export type Gender = "male" | "female" | "other";

export type Measurements = {
  unit: string;
  amount: number;
};

export interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  displayName?: string;
  gender?: Gender;
  birthday?: Date;
  horoscope?: string;
  zodiac?: string;
  height?: Measurements;
  weight?: Measurements;
  profileImage?: string;
  interests?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  username: string; // can be username or email
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<User, "_id" | "password"> & { _id: string };
}

export interface HoroscopeInfo {
  dateRange: string;
  element: "fire" | "earth" | "air" | "water" | "Unknown";
  modality: "cardinal" | "fixed" | "mutable" | "Unknown";
  symbol: string;
  sign: string;
  traits: string[];
  icon: string;
}

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
