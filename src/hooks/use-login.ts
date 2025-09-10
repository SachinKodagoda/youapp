import { LoginFormData } from "@/types/schema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogin() {
  const router = useRouter();

  const loginUser = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/login", {
        body: JSON.stringify({ password: data.password, username: data.username }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        router.push("/");
      } else {
        toast.error("Username or password is incorrect.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return { loginUser };
}
