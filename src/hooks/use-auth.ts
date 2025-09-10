import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthUser {
  id: string;
  username: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      setIsAuthenticated(false);
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userData || "{}");

      // Validate that we have required user data
      if (user.id && user.username) {
        setAuthUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error("Invalid user data");
      }
    } catch {
      setIsAuthenticated(false);

      // Clear invalid data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  return {
    authUser,
    getAuthHeaders,
    isAuthenticated,
    logout,
  };
};
