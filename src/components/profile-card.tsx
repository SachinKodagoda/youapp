import { User } from "@/types/user";
import { calculateAge } from "@/utils/calculate-age";
import { getHoroscopeIcon } from "@/utils/get-horoscope";
import { getZodiacIcon } from "@/utils/get-zodiac";
import EditIcon from "@assets/images/edit-icon.svg";
import Image from "next/image";

type TProps = {
  user?: User | null;
  horoscope?: string;
  zodiac?: string;
};

export default function ProfileCard({ horoscope, user, zodiac }: TProps) {
  return (
    <div className="profile-card relative min-h-[190px] rounded-2xl p-4">
      <Image
        src={EditIcon}
        width={17}
        height={17}
        alt="edit icon"
        className="absolute right-4 top-4"
      />
      <div className="absolute bottom-4 left-4 text-sm">
        <div className="mb-[2px] text-base font-bold">
          {user?.displayName}
          {user?.birthday ? `, ${calculateAge(`${user?.birthday}`)}` : ""}
        </div>
        <div className="text-[13px] capitalize">{user?.gender && user.gender}</div>
        <div className="mt-2 flex gap-2">
          {horoscope && (
            <span className="rounded-3xl bg-white/[0.06] px-4 py-2 text-center backdrop-blur-[50px]">
              {getHoroscopeIcon(horoscope)} {horoscope}
            </span>
          )}
          {zodiac && (
            <span className="rounded-3xl bg-white/[0.06] px-4 py-2 text-center backdrop-blur-[50px]">
              {getZodiacIcon(zodiac)} {zodiac}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
