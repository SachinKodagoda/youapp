type TProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  loader?: boolean;
  disabled?: boolean;
};

export default function AboutFormElement({
  disabled = false,
  label,
  loader = false,
  onChange,
  placeholder = "",
  value = "",
}: TProps) {
  return (
    <>
      <label htmlFor={label} className="text-xs-plus font-medium text-white/[0.33]">
        {label}:
      </label>
      <input
        disabled={disabled}
        type="text"
        id={label}
        className="w-full rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06] p-3 text-right text-xs-plus outline-none placeholder:text-white/[0.3]"
        placeholder={placeholder}
        value={loader ? "..." : value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </>
  );
}
