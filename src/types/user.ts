import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  displayName?: string;
  gender?: "male" | "female" | "other";
  birthday?: Date;
  horoscope?: string;
  zodiac?: string;
  height?: {
    unit: string;
    amount: number;
  };
  weight?: {
    unit: string;
    amount: number;
  };
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
