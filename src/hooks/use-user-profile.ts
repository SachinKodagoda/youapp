import { User } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [horoscope, setHoroscope] = useState("--");
  const [zodiac, setZodiac] = useState("--");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/get-profile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      const data = await response.json();
      const userData = data.user;

      setUser(userData);
      setZodiac(userData?.zodiac || "--");
      setHoroscope(userData?.horoscope || "--");
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    horoscope,
    isLoading,
    refetchUserData: fetchUserData,
    user,
    zodiac,
  };
};
