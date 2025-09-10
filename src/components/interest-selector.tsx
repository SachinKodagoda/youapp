import { INTEREST_OPTIONS } from "@/constants/interests";
import { selectClassNames } from "@/styles/select-styles";
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
      classNames={selectClassNames}
      className="mb-4"
    />
  );
}
