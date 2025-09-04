type TProps = { label: string; placeholder?: string };

export default function AboutFormElement({ placeholder = "", label }: TProps) {
  const obj1 = { b: 2, c: 3, a: 1 };

  console.log(": =-->", obj1);
  return (
    <>
      <label htmlFor={label} className="text-xs font-[500] text-white/[0.6]">
        {label}:
      </label>
      <input
        type="text"
        id={label}
        className="mt-1 w-full rounded-lg bg-white/[0.08] p-3 text-right text-sm outline-none placeholder:text-white/[0.4]"
        placeholder={placeholder}
      />
    </>
  );
}
