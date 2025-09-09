"use client";
import { DayPicker } from "react-day-picker";

import * as Popover from "@radix-ui/react-popover";
import { format, startOfMonth } from "date-fns";

type TProps = {
  label: string;
  placeholder?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export default function AboutDate({ label, onChange, placeholder = "", value }: TProps) {
  /* eslint-disable-next-line no-console */
  console.log("value: =-->", value);
  const today = new Date();
  return (
    <>
      <label className="text-[13px] font-[500] text-white/[0.33]">{label}:</label>

      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="w-full rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06] p-3 text-right text-[13px] outline-none">
            {value ? (
              <span>{format(value, "dd MM yyyy")}</span>
            ) : (
              <span className="text-white/[0.3]">{placeholder}</span>
            )}
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>
            <div className="w-auto scale-75 overflow-hidden bg-white p-6">
              <DayPicker
                navLayout="around"
                animate
                captionLayout="dropdown"
                defaultMonth={value ? startOfMonth(value) : startOfMonth(today)}
                mode="single"
                selected={value}
                onSelect={onChange}
                disabled={{ after: today }}
              />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}
