import PlusIcon from "@assets/images/plus-icon.svg";
import Image from "next/image";

export default function AddImage() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[57px] w-[57px] items-center justify-center rounded-3xl bg-white/[0.08]">
        <Image src={PlusIcon} width={20} height={20} alt="plus icon" />
      </div>
      <div className="text-xs font-[500]">Add image</div>
    </div>
  );
}
