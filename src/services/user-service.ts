import { User } from "@/types/user";

interface UserApiResponse {
  user: User;
}

export class UserService {
  static async getProfile(userId: string, authHeaders: Record<string, string>): Promise<User> {
    const response = await fetch(`/api/get-profile?userId=${userId}`, {
      headers: authHeaders,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data: UserApiResponse = await response.json();
    return data.user;
  }
}
