import EditIcon from "@assets/images/edit-icon.svg";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="profile-card relative min-h-[190px] rounded-2xl p-4">
      <Image
        src={EditIcon}
        width={17}
        height={17}
        alt="edit icon"
        className="absolute right-4 top-4"
      />
      <p className="absolute bottom-4 left-4">@johndoe123,</p>
    </div>
  );
}
