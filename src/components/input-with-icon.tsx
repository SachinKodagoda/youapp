import Image from "next/image";

type TProps = { src: string; name: string; placeholder: string };

export default function InputWithIcon({ src, name, placeholder }: TProps) {
  return (
    <div className="relative">
      <input
        type="text"
        className="h-[51px] w-full rounded-lg bg-white/10 px-5 pr-10 text-sm outline-none placeholder:text-white/40"
        name={name}
        autoComplete="off"
        placeholder={placeholder}
      ></input>
      <Image
        src={src}
        width={20}
        height={17}
        alt="input icon"
        className="absolute right-4 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
