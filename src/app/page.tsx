import BackImage from "@/assets/images/back.svg";
import EyeClosed from "@/assets/images/eye-closed.svg";
import InputWithIcon from "@/components/input-with-icon";

import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col justify-between p-4">
      <nav className="flex gap-2 text-sm font-bold">
        <Image src={BackImage} width={7} height={14} alt="back icon" />
        Back
      </nav>
      <section className="flex flex-col gap-[25px] p-6">
        <header className="flex text-2xl font-bold">Login</header>
        <div className="flex w-full flex-col gap-[15px]">
          <input
            type="text"
            className="h-[51px] rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40"
            name="username"
            autoComplete="off"
            placeholder="Enter Username/Email"
          ></input>
          <InputWithIcon
            src={EyeClosed}
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button className="login-button w-full rounded-lg">Login</button>
      </section>
      <div className="flex justify-center text-xs font-[500]">
        <div className="flex gap-1">
          No account? <div className="text-golden-gradient">Register here</div>
        </div>
      </div>
    </main>
  );
}
