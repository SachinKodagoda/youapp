import { AuthenticatedRequest, withAuth } from "@/lib/auth-middleware";
import { connectToDatabase } from "@/lib/mongodb";
import { Gender, Measurements, User } from "@/types/user";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface UpdateProfileRequest {
  interests?: string[];
  profileImage?: string;
  horoscope?: string;
  zodiac?: string;
  birthday?: string;
  displayName?: string;
  gender?: Gender;
  height?: Measurements;
  weight?: Measurements;
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
    if (body.horoscope !== undefined) updateData.horoscope = body.horoscope;
    if (body.zodiac !== undefined) updateData.zodiac = body.zodiac;
    if (body.profileImage !== undefined) updateData.profileImage = body.profileImage;
    if (body.interests !== undefined) updateData.interests = body.interests;

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
export const PUT = withAuth(updateProfileHandler);
