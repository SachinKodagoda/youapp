import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

interface CheckAvailabilityRequest {
  email?: string;
  username?: string;
}

interface CheckAvailabilityResponse {
  available: boolean;
  message: string;
  success: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse<CheckAvailabilityResponse>> {
  try {
    const body: CheckAvailabilityRequest = await request.json();
    const { email, username } = body;

    if (!email && !username) {
      return NextResponse.json(
        {
          available: false,
          message: "Email or username is required",
          success: false,
        },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    // Build query based on what fields are provided
    const query: Partial<Pick<User, "email" | "username">> = {};
    if (email) query.email = email;
    if (username) query.username = username;

    // Use $or if both fields are provided
    const searchQuery = email && username ? { $or: [{ email }, { username }] } : query;

    const existingUser = await usersCollection.findOne(searchQuery);

    if (existingUser) {
      let message = "";
      if (existingUser.email === email && existingUser.username === username) {
        message = "Both email and username are already taken";
      } else if (existingUser.email === email) {
        message = "Email is already taken";
      } else {
        message = "Username is already taken";
      }

      return NextResponse.json(
        {
          available: false,
          message,
          success: true,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        available: true,
        message: "Available",
        success: true,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        available: false,
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
}
