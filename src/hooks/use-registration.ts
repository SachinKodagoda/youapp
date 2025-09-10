import { RegisterFormData } from "@/types/schema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useRegistration() {
  const router = useRouter();

  const registerUser = async (data: RegisterFormData) => {
    try {
      // Final availability check before submission
      const availabilityResponse = await fetch("/api/check-availability", {
        body: JSON.stringify({ email: data.email, username: data.username }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const availabilityData = await availabilityResponse.json();

      if (availabilityData.success && !availabilityData.available) {
        toast.error(availabilityData.message);
        return;
      }

      // Proceed with registration
      const response = await fetch("/api/register", {
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Registration successful!");
        // Store token and user data if needed
        if (result.token) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        router.push("/");
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return { registerUser };
}
