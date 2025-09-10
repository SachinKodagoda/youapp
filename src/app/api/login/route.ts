import { generateToken, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { LoginRequest, LoginResponse, User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    // Parse request body
    const body: LoginRequest = await request.json();
    const { password, username } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          message: "Username and password are required",
          success: false,
        },
        { status: 400 },
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    // Find user by username or email
    const user = await usersCollection.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          success: false,
        },
        { status: 401 },
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          success: false,
        },
        { status: 401 },
      );
    }

    // Generate JWT token
    const userWithoutPassword = {
      birthday: user.birthday,
      createdAt: user.createdAt,
      displayName: user.displayName,
      email: user.email,
      gender: user.gender,
      height: user.height,
      horoscope: user.horoscope,
      id: user._id?.toString(),
      profileImage: user.profileImage,
      updatedAt: user.updatedAt,
      username: user.username,
      weight: user?.weight,
      zodiac: user?.zodiac,
    };

    const token = generateToken(userWithoutPassword);

    // Update last login timestamp (optional)
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLoginAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json(
      {
        message: "Login successful",
        success: true,
        token,
        user: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
}

// Handle non-POST requests
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
