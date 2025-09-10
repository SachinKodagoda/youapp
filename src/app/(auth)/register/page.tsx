"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";

import AuthNavigation from "@/components/auth-navigation";
import Loader from "@/components/elements/loader";
import FormField from "@/components/form-field";
import PasswordField from "@/components/password-field";
import { useAvailabilityCheck } from "@/hooks/use-availability-check";
import { useRegistration } from "@/hooks/use-registration";
import { RegisterFormData } from "@/types/schema";
import { registerSchema } from "@/utils/register-schema";

export default function Register() {
  const { registerUser } = useRegistration();

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

  const { debouncedCheckAvailability, loadingStates } = useAvailabilityCheck(clearErrors, setError);

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
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
            <FormField
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              error={errors.email}
              isLoading={loadingStates.email}
              {...register("email")}
              onChange={(e) => {
                register("email").onChange(e);
                debouncedCheckAvailability("email", e.target.value);
              }}
            />

            <FormField
              type="text"
              placeholder="Create Username"
              autoComplete="off"
              error={errors.username}
              isLoading={loadingStates.username}
              {...register("username")}
              onChange={(e) => {
                register("username").onChange(e);
                debouncedCheckAvailability("username", e.target.value);
              }}
            />

            <PasswordField
              placeholder="Enter Password"
              autoComplete="new-password"
              error={errors.password}
              {...register("password")}
            />

            <PasswordField
              placeholder="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword}
              {...register("confirmPassword")}
            />

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

          <AuthNavigation text="Have an account?" linkText="Login here" linkHref="/login" />
        </div>
      </section>
    </main>
  );
}
