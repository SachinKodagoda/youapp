"use client";
import { useMemo } from "react";
import Select from "react-select";

type TProps = {
  label: string;
  placeholder?: string;
  value?: {
    unit: string;
    amount: number;
  };
  onChange?: (value: { unit: string; amount: number }) => void;
  options: { label: string; value: string }[];
};

export default function AboutMeasureElement({
  label,
  onChange,
  options = [],
  placeholder = "",
  value = {
    amount: 0,
    unit: "",
  },
}: TProps) {
  const selectedOption = useMemo(() => {
    return value.unit ? options.find((option) => option.value === value.unit) || null : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.unit]);

  return (
    <>
      <label htmlFor={label} className="text-xs-plus font-medium text-white/[0.33]">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06] text-sm">
        <input
          type="text"
          id={label}
          className="text-xs-plus w-[calc(100%-85px)] flex-auto bg-transparent py-3 pl-3 pr-3 text-right outline-none placeholder:text-white/[0.3]"
          placeholder={placeholder}
          value={value.amount || 0}
          onChange={(e) => {
            if (onChange) {
              const inputValue = e.target.value;
              const numericValue = inputValue === "" ? 0 : parseFloat(inputValue) || 0;
              onChange({
                amount: numericValue,
                unit: value.unit || "",
              });
            }
          }}
        />

        <div className="relative w-[80px] flex-none">
          <Select
            isSearchable={false}
            placeholder={placeholder}
            value={selectedOption}
            onChange={(option) => {
              if (onChange && option) {
                onChange({
                  amount: value.amount,
                  unit: option?.value,
                });
              }
            }}
            options={options}
            className="react-select-container"
            classNamePrefix="react-select"
            unstyled={true}
            classNames={{
              control: () =>
                "flex justify-between border border-white/[0.22] px-3 py-3 rounded-lg bg-white/5 text-white",
              dropdownIndicator: () => "text-white/60 hidden",
              menu: () =>
                "border border-white/[0.22] bg-[#0e191f] rounded-lg mt-1 text-right overflow-hidden",
              option: () => "px-3 py-2 hover:bg-white/5 text-white",
              placeholder: () => "text-white/[0.33] text-right",
              singleValue: () => "text-white text-right",
            }}
          />
        </div>
      </div>
    </>
  );
}
