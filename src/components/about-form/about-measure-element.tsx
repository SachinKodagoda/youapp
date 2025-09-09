"use client";
import { Select } from "@headlessui/react";
import clsx from "clsx";

type TProps = {
  label: string;
  placeholder?: string;
  measureList: string[];
  value?: {
    unit: string;
    amount: number;
  };
  onChange?: (value: { unit: string; amount: number }) => void;
};

export default function AboutMeasureElement({
  label,
  measureList = [],
  onChange,
  placeholder = "",
  value = {
    amount: 0,
    unit: "",
  },
}: TProps) {
  return (
    <>
      <label htmlFor={label} className="text-[13px] font-[500] text-white/[0.33]">
        {label}:
      </label>
      <div className="flex items-center rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06]">
        <div className="relative flex flex-auto items-center">
          <input
            type="number"
            id={label}
            className="w-full bg-transparent py-3 pl-3 pr-0 text-right text-[13px] outline-none placeholder:text-white/[0.3]"
            placeholder={placeholder}
            value={value.amount || 0}
            onChange={(e) =>
              onChange &&
              onChange({
                amount: +(e.target.value || 0),
                unit: value.unit || "",
              })
            }
          />
        </div>

        <div className="relative flex flex-auto items-center">
          <Select
            value={value.unit}
            onChange={(e) =>
              onChange &&
              onChange({
                amount: +(value.amount || 0),
                unit: e.target.value || "",
              })
            }
            required
            className={clsx(
              "w-full text-right",
              "appearance-none bg-transparent pr-3 text-sm/6 text-white",
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
    </>
  );
}
