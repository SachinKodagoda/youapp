"use client";

import Loader from "@/components/elements/loader";
import EyeClosed from "@assets/images/eye-closed.svg";
import EyeOpened from "@assets/images/eye-opened.svg";
import PasswordInput from "@components/password-input";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isValid = password.length > 0 && username.length > 0;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!isValid) return;

    try {
      setIsLoading(true);
      const response = await fetch("/api/login", {
        body: JSON.stringify({ password, username }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.success) {
        setIsLoading(false);
        router.push("/home");
      } else {
        setIsLoading(false);
        toast.error("Username or password is incorrect.");
      }
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="container flex min-h-dvh flex-col justify-between gap-4 p-4">
      <section className="flex w-full flex-auto items-center">
        <div className="flex w-full flex-col gap-[25px] p-6">
          <header className="flex pl-5 text-2xl font-bold">Login</header>
          <form className="flex w-full flex-col gap-[15px]" autoComplete="off">
            <input
              type="text"
              className="select-wrapper h-[51px] rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40"
              name="username"
              autoComplete="off"
              placeholder="Enter Username/Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <PasswordInput
              src={showPassword ? EyeOpened : EyeClosed}
              name="password"
              placeholder="Enter Password"
              onClick={() => setShowPassword((show) => !show)}
              onChange={(value) => setPassword(value)}
              value={password}
              showPassword={showPassword}
            />
          </form>
          <button
            className={clsx(
              !isValid && "login-inactive",
              "login-button flex w-full items-center justify-center gap-2 rounded-lg",
            )}
            onClick={onSubmit}
          >
            {isLoading && <Loader size={15} />}
            Login
          </button>
          <div className="mt-5 flex justify-center text-xs font-[500]">
            <div className="flex gap-1">
              No account? <div className="text-golden-gradient cursor-pointer">Register here</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
