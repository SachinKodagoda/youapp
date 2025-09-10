import Loader from "@/components/elements/loader";
import BackImage from "@assets/images/back-icon.svg";
import Image from "next/image";

interface InterestHeaderProps {
  isUpdating: boolean;
  onBack: () => void;
  onSave: () => void;
}

export default function InterestHeader({ isUpdating, onBack, onSave }: InterestHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-14 cursor-pointer gap-2 text-sm font-bold" onClick={onBack}>
        <Image src={BackImage} width={7} height={14} alt="back icon" className="w-auto" />
        Back
      </div>
      <div
        className="blue-text flex w-11 cursor-pointer items-center justify-end gap-1 text-sm font-semibold"
        onClick={onSave}
      >
        {isUpdating && <Loader size={15} />} Save
      </div>
    </div>
  );
}
