type TProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  loader?: boolean;
};

export default function AboutFormElement({
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
        type="text"
        id={label}
        className="text-xs-plus w-full rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06] p-3 text-right outline-none placeholder:text-white/[0.3]"
        placeholder={placeholder}
        value={loader ? "..." : value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </>
  );
}
