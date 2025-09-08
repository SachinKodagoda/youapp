"use client";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

import * as Popover from "@radix-ui/react-popover";

type TProps = { label: string; placeholder?: string };

export default function AboutDate({ label, placeholder = "" }: TProps) {
  const [selected, setSelected] = useState<Date>();
  return (
    <>
      <label htmlFor={label} className="text-[13px] font-[500] text-white/[0.33]">
        {label}:
      </label>

      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="w-full rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06] p-3 text-right text-[13px] outline-none">
            {selected ? (
              <span>{selected.toLocaleDateString()}</span>
            ) : (
              <span className="text-white/[0.3]">{placeholder}</span>
            )}
          </div>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content>
            <div className="w-auto overflow-hidden bg-white p-6">
              <DayPicker animate mode="single" selected={selected} onSelect={setSelected} />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}
