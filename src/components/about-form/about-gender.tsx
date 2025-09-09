"use client";

import { useMemo } from "react";
import Select from "react-select";

type TProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function AboutGender({ label, onChange, placeholder = "", value = "" }: TProps) {
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const selectedOption = useMemo(() => {
    return value ? options.find((option) => option.value === value) || null : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <label htmlFor={label} className="text-[13px] font-[500] text-white/[0.33]">
        {label}:
      </label>

      <Select
        placeholder={placeholder}
        isSearchable={false}
        value={selectedOption}
        onChange={(option) => {
          if (onChange && option) {
            onChange(option?.value);
          }
        }}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled={true}
        classNames={{
          control: () =>
            "flex justify-between border border-white/[0.22] px-3 py-3 rounded-lg bg-white/5 text-white",
          dropdownIndicator: () => "text-white/60",
          menu: () => "border border-white/[0.22] bg-[#0e191f] rounded-lg mt-1 text-right",
          option: () => "px-3 py-2 hover:bg-white/5 text-white",
          placeholder: () => "text-white/[0.33] text-right",
          singleValue: () => "text-white text-right",
        }}
      />
    </>
  );
}
