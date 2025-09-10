import { AuthenticatedRequest, withAuth } from "@/lib/auth-middleware";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/types/user";
import { transformMongoDoc } from "@/utils/mongo-transform";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

async function getProfileHandler(request: AuthenticatedRequest): Promise<NextResponse> {
  try {
    if (!request.user) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Connect to database
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    // Get user profile
    const objectId = new ObjectId(request.user.id);
    const user = await usersCollection.findOne(
      { _id: objectId },
      { projection: { password: 0 } }, // Exclude password from response
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile retrieved successfully",
        success: true,
        user: transformMongoDoc(user),
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

// Export the protected route
export const GET = withAuth(getProfileHandler);
