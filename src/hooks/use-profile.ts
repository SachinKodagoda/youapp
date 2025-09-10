import type { Option } from "@/types/interest";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProfile = () => {
  const [selectedInterests, setSelectedInterests] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/get-profile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const data = await response.json();
      const interests = data.user?.interests || [];
      const interestOptions = interests.map((interest: string) => ({
        label: interest,
        value: interest.toLowerCase(),
      }));
      setSelectedInterests(interestOptions);
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (interests: Option[]) => {
    try {
      setIsUpdating(true);
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const token = localStorage.getItem("token");

      const response = await fetch("/api/update-profile", {
        body: JSON.stringify({
          interests: interests.map((interest) => interest.label),
          userId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      await response.json();
      toast.success("Interests updated successfully!");
      return true;
    } catch {
      toast.error("Something went wrong. Please try again later.");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return {
    isLoading,
    isUpdating,
    selectedInterests,
    setSelectedInterests,
    updateProfile,
  };
};
