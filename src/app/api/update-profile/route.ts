import { AuthenticatedRequest, withAuth } from "@/lib/auth-middleware";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/types/user";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface UpdateProfileRequest {
  birthday?: string;
  displayName?: string;
  gender?: string;
  height?: number;
  weight?: number;
}

async function updateProfileHandler(request: AuthenticatedRequest): Promise<NextResponse> {
  try {
    if (!request.user) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Parse request body
    const body: UpdateProfileRequest = await request.json();
    const { birthday, displayName, gender, height, weight } = body;

    // Connect to database
    const { db } = await connectToDatabase();
    const usersCollection = db.collection<User>("users");

    // Prepare update object
    const updateData: Partial<User> = {
      updatedAt: new Date(),
    };

    if (displayName !== undefined) updateData.displayName = displayName;
    if (gender !== undefined) updateData.gender = gender;
    if (height !== undefined) updateData.height = height;
    if (weight !== undefined) updateData.weight = weight;
    if (birthday !== undefined) updateData.birthday = new Date(birthday);

    // Update user profile
    const objectId = new ObjectId(request.user.id);
    const result = await usersCollection.updateOne({ _id: objectId }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get updated user profile
    const updatedUser = await usersCollection.findOne(
      { _id: objectId },
      { projection: { password: 0 } },
    );

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        success: true,
        user: {
          ...updatedUser,
          _id: updatedUser?._id?.toString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Update profile error:", error);

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
export const PUT = withAuth(updateProfileHandler);
