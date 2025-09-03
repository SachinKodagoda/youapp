import EditIcon from "@assets/images/edit-icon.svg";
import Image from "next/image";

type TProps = { title: string; detail: string; onEdit?: () => void };

export default function DetailCard({ title, detail, onEdit }: TProps) {
  return (
    <div className="detail-card relative flex flex-col gap-10 rounded-2xl p-4 text-sm">
      <h2 className="font-bold">{title}</h2>
      <p className="text-white/50">{detail}</p>
      <Image
        src={EditIcon}
        width={17}
        height={17}
        alt="edit icon"
        className="absolute right-4 top-4 cursor-pointer"
        onClick={onEdit}
      />
    </div>
  );
}
