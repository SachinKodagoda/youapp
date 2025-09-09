import { generateToken, hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

interface RegisterResponse {
  message: string;
  success: boolean;
  token?: string;
  user?: {
    _id: string;
    createdAt: Date;
    email: string;
    updatedAt: Date;
    username: string;
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<RegisterResponse>> {
  try {
    // Parse request body
    const body: RegisterRequest = await request.json();
    const { email, password, username } = body;

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message: "Username, email, and password are required",
          success: false,
        },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          success: false,
        },
        { status: 400 },
      );
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters long",
          success: false,
        },
        { status: 400 },
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Username or email already exists",
          success: false,
        },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: Omit<User, "_id"> = {
      createdAt: new Date(),
      email,
      password: hashedPassword,
      updatedAt: new Date(),
      username,
    };

    const result = await usersCollection.insertOne(newUser as User);

    // Generate token for immediate login
    const userWithoutPassword = {
      _id: result.insertedId.toString(),
      createdAt: newUser.createdAt,
      email: newUser.email,
      updatedAt: newUser.updatedAt,
      username: newUser.username,
    };

    const token = generateToken(userWithoutPassword);

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        token,
        user: userWithoutPassword,
      },
      { status: 201 },
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
