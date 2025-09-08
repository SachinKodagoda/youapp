"use client";
import DownArrow from "@assets/images/down-arrow-icon.svg";
import { Select } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type TProps = { label: string; placeholder?: string };

export default function AboutSelect({ label, placeholder = "" }: TProps) {
  const [value, setValue] = useState("");

  /* eslint-disable-next-line no-console */
  console.log("value: =-->", value);
  return (
    <>
      <label htmlFor={label} className="text-[13px] font-[500] text-white/[0.33]">
        {label}:
      </label>

      <div className="w-full">
        <div className="relative">
          <Select
            onChange={(e) => setValue(e.target.value)}
            id={label}
            required
            defaultValue=""
            className={clsx(
              "border border-white/[0.22] px-3 py-3 pr-7 text-right",
              "block w-full appearance-none rounded-lg bg-white/5 text-sm/6 text-white",
              "outline-none ring-0 focus:ring-0",
              "*:text-black",
              "[&:has(option[value='']:checked)]:text-white/[0.33]",
            )}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          <Image
            src={DownArrow}
            width={10}
            height={5}
            alt="back icon"
            className="group pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 fill-white/60 outline-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
}
