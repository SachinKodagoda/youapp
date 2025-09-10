import { UI_TEXT } from "@/constants/ui-text";
import BackImage from "@assets/images/back-icon.svg";
import Image from "next/image";

interface BackButtonProps {
  onBack: () => void;
  visible: boolean;
}

export default function BackButton({ onBack, visible }: BackButtonProps) {
  if (!visible) return <div className="w-14" />;

  return (
    <div
      onClick={onBack}
      className="flex w-14 cursor-pointer select-none items-center gap-2 text-sm font-bold"
    >
      <Image src={BackImage} width={7} height={14} alt="back icon" className="w-auto" />
      {UI_TEXT.BACK}
    </div>
  );
}
