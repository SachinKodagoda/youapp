"use client";
import { Select } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

type TProps = { label: string; placeholder?: string; measureList: string[] };

export default function AboutMeasureElement({ label, measureList = [], placeholder = "" }: TProps) {
  const [value, setValue] = useState("");
  /* eslint-disable-next-line no-console */
  console.log("value: =-->", value);
  return (
    <>
      <label htmlFor={label} className="text-[13px] font-[500] text-white/[0.33]">
        {label}:
      </label>
      <div className="flex rounded-lg border border-white/[0.22]">
        <input
          type="text"
          id={label}
          className="w-full flex-auto bg-[#d9d9d9]/[0.06] p-3 text-right text-[13px] outline-none placeholder:text-white/[0.3]"
          placeholder={placeholder}
        />

        <div className="">
          <div className="relative">
            <Select
              onChange={(e) => setValue(e.target.value)}
              required
              className={clsx(
                "px-3 py-3 text-right",
                "appearance-none bg-white/5 text-sm/6 text-white",
                "outline-none ring-0 focus:ring-0",
                "*:text-black",
                "[&:has(option[value='']:checked)]:text-white/[0.33]",
              )}
            >
              {measureList.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
