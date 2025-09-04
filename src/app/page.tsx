"use client";

import BackImage from "@assets/images/back-icon.svg";
import EyeClosed from "@assets/images/eye-closed.svg";
import EyeOpened from "@assets/images/eye-opened.svg";
import PasswordInput from "@components/password-input";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isValid = password.length > 0 && username.length > 0;
  return (
    <main className="container flex min-h-screen flex-col justify-between gap-4 p-4">
      <nav className="flex gap-2 text-sm font-bold">
        <Image src={BackImage} width={7} height={14} alt="back icon" />
        Back
      </nav>
      <section className="flex w-full flex-auto items-center">
        <div className="flex w-full flex-col gap-[25px] p-6">
          <header className="flex pl-5 text-2xl font-bold">Login</header>
          <form className="flex w-full flex-col gap-[15px]" autoComplete="off">
            <input
              type="text"
              className="h-[51px] rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40"
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
          <button className={clsx(!isValid && "login-inactive", "login-button w-full rounded-lg")}>
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
