"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";

import AuthNavigation from "@/components/auth-navigation";
import Loader from "@/components/elements/loader";
import FormField from "@/components/form-field";
import PasswordField from "@/components/password-field";
import { useLogin } from "@/hooks/use-login";
import { LoginFormData } from "@/types/schema";
import { loginSchema } from "@/utils/login-schema";

export default function Login() {
  const { loginUser } = useLogin();

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data);
  };

  return (
    <main className="container flex min-h-dvh flex-col justify-between gap-4 p-4">
      <section className="flex w-full flex-auto items-center">
        <div className="flex w-full flex-col gap-[25px] p-6">
          <header className="flex pl-5 text-2xl font-bold">Login</header>
          <form
            className="flex w-full flex-col gap-[15px]"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <FormField
              type="text"
              placeholder="Enter Username/Email"
              autoComplete="off"
              error={errors.username}
              {...register("username")}
            />

            <PasswordField
              placeholder="Enter Password"
              autoComplete="current-password"
              error={errors.password}
              {...register("password")}
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
              Login
            </button>
          </form>

          <AuthNavigation text="No account?" linkText="Register here" linkHref="/register" />
        </div>
      </section>
    </main>
  );
}
