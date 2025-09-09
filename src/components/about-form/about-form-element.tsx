type TProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function AboutFormElement({
  label,
  onChange,
  placeholder = "",
  value = "",
}: TProps) {
  return (
    <>
      <label htmlFor={label} className="text-[13px] font-[500] text-white/[0.33]">
        {label}:
      </label>
      <input
        type="text"
        id={label}
        className="w-full rounded-lg border border-white/[0.22] bg-[#d9d9d9]/[0.06] p-3 text-right text-[13px] outline-none placeholder:text-white/[0.3]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </>
  );
}
