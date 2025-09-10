import { INTEREST_OPTIONS } from "@/constants/interests";
import type { Option } from "@/types/interest";
import type { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface InterestSelectorProps {
  onChange: (newValue: MultiValue<Option>) => void;
  value: Option[];
}

export default function InterestSelector({ onChange, value }: InterestSelectorProps) {
  return (
    <CreatableSelect
      isMulti
      value={value}
      onChange={onChange}
      options={INTEREST_OPTIONS}
      placeholder=""
      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      instanceId="interest-select"
      unstyled
      components={{
        ClearIndicator: () => null,
        DropdownIndicator: () => null,
      }}
      classNames={{
        clearIndicator: () => "text-gray-400 hover:text-white cursor-pointer p-2",
        control: () => "text-white min-h-[50px] rounded-md px-3 py-2 bg-[#D9D9D90F]",
        dropdownIndicator: () => "text-gray-400 hover:text-white cursor-pointer p-2",
        indicatorsContainer: () => "flex items-center",
        input: () => "text-white",
        menu: () => "bg-gray-900 border border-gray-600 rounded-md mt-1 shadow-lg overflow-hidden",
        multiValue: () => "rounded px-2 py-1 m-1 bg-[#FFFFFF1A]",
        multiValueLabel: () => "text-white text-sm ",
        multiValueRemove: () => "text-gray-300 hover:text-white ml-1 cursor-pointer",
        option: ({ isFocused }: { isFocused: boolean }) =>
          `px-3 py-2 text-white cursor-pointer ${
            isFocused ? "bg-gray-700" : "bg-gray-900 hover:bg-gray-700"
          }`,
        placeholder: () => "text-gray-500",
        valueContainer: () => "flex flex-wrap gap-0 p-1",
      }}
      className="mb-4"
    />
  );
}
