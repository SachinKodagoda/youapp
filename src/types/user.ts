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
  user?: {
    _id: string;
    birthday?: Date;
    createdAt: Date;
    displayName?: string;
    email: string;
    gender?: string;
    height?: number;
    horoscope?: string;
    profileImage?: string;
    updatedAt: Date;
    username: string;
    weight?: number;
    zodiac?: string;
  };
}
