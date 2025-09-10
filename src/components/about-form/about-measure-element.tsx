"use client";
import { useEffect, useMemo, useState } from "react";
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
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  // Update local input value when external value changes (but not during focus)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.amount === 0 ? "" : value.amount.toString());
    }
  }, [value.amount, isFocused]);

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
          className="w-[calc(100%-85px)] flex-auto bg-transparent py-3 pl-3 pr-3 text-right text-xs-plus outline-none placeholder:text-white/[0.3]"
          placeholder={placeholder}
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            const newInputValue = e.target.value;
            setInputValue(newInputValue);

            if (onChange) {
              // Allow empty string
              if (newInputValue === "") {
                onChange({
                  amount: 0,
                  unit: value.unit || "",
                });
                return;
              }

              // Regex to allow valid decimal number input during typing
              // Allows: 0, 0., 0.5, 1, 1., 1.5, 12.34, . etc.
              // Disallows: 01, 02.5, abc, 1.2.3 etc.
              const validNumberPattern = /^(0(\.\d*)?|[1-9]\d*(\.\d*)?|\.)$/;

              if (validNumberPattern.test(newInputValue)) {
                // For standalone decimal point, set amount to 0
                let numericValue: number;

                if (newInputValue === ".") {
                  numericValue = 0;
                } else if (newInputValue.endsWith(".")) {
                  // For values like "4.", store as number but preserve decimal point in display
                  numericValue = parseFloat(newInputValue);
                } else {
                  numericValue = parseFloat(newInputValue) || 0;
                }

                onChange({
                  amount: numericValue,
                  unit: value.unit || "",
                });
              } else {
                // If invalid pattern, revert to previous valid value
                setInputValue(value.amount === 0 ? "" : value.amount.toString());
              }
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
