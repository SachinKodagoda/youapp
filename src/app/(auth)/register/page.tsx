"use client";

import Loader from "@/components/elements/loader";
import { useDebounce } from "@/hooks/useDebounce";
import { RegisterFormData } from "@/types/schema";
import { registerSchema } from "@/utils/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    clearErrors,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormData>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  // Debounced availability check
  const checkAvailability = useCallback(
    async (field: "email" | "username", value: string) => {
      if (!value || value.length < 3) return;

      try {
        const response = await fetch("/api/check-availability", {
          body: JSON.stringify({ [field]: value }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const data = await response.json();

        if (data.success && !data.available) {
          setError(field, { message: data.message, type: "manual" });
        } else if (data.success && data.available) {
          clearErrors(field);
        }
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error("Availability check error:", error);
      }
    },
    [clearErrors, setError],
  );

  const debouncedCheckAvailability = useDebounce(checkAvailability, 500);

  const onSubmit = async (data: RegisterFormData) => {
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
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="container flex min-h-dvh flex-col justify-between gap-4 p-4">
      <section className="flex w-full flex-auto items-center">
        <div className="flex w-full flex-col gap-[25px] p-6">
          <header className="flex pl-5 text-2xl font-bold">Register</header>
          <form
            className="flex w-full flex-col gap-[15px]"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="flex flex-col gap-1">
              <input
                type="email"
                className={clsx(
                  "select-wrapper h-[51px] rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40",
                  errors.email && "border border-red-500",
                )}
                placeholder="Enter Email"
                autoComplete="off"
                {...register("email")}
                onChange={(e) => {
                  register("email").onChange(e);
                  debouncedCheckAvailability("email", e.target.value);
                }}
              />
              {errors.email && (
                <span className="px-2 text-xs text-red-400">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                className={clsx(
                  "select-wrapper h-[51px] rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40",
                  errors.username && "border border-red-500",
                )}
                placeholder="Create Username"
                autoComplete="off"
                {...register("username")}
                onChange={(e) => {
                  register("username").onChange(e);
                  debouncedCheckAvailability("username", e.target.value);
                }}
              />
              {errors.username && (
                <span className="px-2 text-xs text-red-400">{errors.username.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={clsx(
                    "select-wrapper h-[51px] w-full rounded-lg bg-white/10 px-5 pr-12 text-sm outline-none placeholder:text-white/40",
                    errors.password && "border border-red-500",
                  )}
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
              {errors.password && (
                <span className="px-2 text-xs text-red-400">{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={clsx(
                    "select-wrapper h-[51px] w-full rounded-lg bg-white/10 px-5 pr-12 text-sm outline-none placeholder:text-white/40",
                    errors.confirmPassword && "border border-red-500",
                  )}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "🙈"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="px-2 text-xs text-red-400">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={clsx(
                !isValid && "login-inactive",
                "login-button flex w-full items-center justify-center gap-2 rounded-lg",
                isSubmitting && "cursor-not-allowed opacity-70",
              )}
            >
              {isSubmitting && <Loader size={15} />}
              Register
            </button>
          </form>

          <div className="mt-5 flex justify-center text-xs font-medium">
            <div className="flex gap-1">
              Have an account?{" "}
              <div
                className="text-golden-gradient cursor-pointer select-none"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login here
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
