import { User } from "@/types/user";
import { calculateAge } from "@/utils/calculate-age";
import { getHoroscopeIcon } from "@/utils/get-horoscope";
import { getZodiacIcon } from "@/utils/get-zodiac";
import Image from "next/image";
import Loader from "./elements/loader";

type TProps = {
  user?: User | null;
  horoscope?: string;
  zodiac?: string;
  loading: boolean;
};

export default function ProfileCard({ horoscope, loading, user, zodiac }: TProps) {
  return (
    <div className="profile-card relative min-h-[190px] rounded-2xl p-4">
      {user?.profileImage && (
        <>
          <Image
            src={user?.profileImage}
            alt="profile cover"
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 60vw, 40vw"
            className="rounded-2xl object-cover"
            quality={75}
            loading="lazy"
          />{" "}
          <div className="absolute inset-0 left-0 top-0 rounded-2xl bg-gradient-to-b from-black/[0.76] via-transparent via-45% to-black"></div>
        </>
      )}

      {loading && (
        <div className="absolute inset-0 left-0 top-0 flex items-center justify-center backdrop-blur-md">
          <Loader />
        </div>
      )}
      <div className="absolute bottom-4 left-4 text-sm">
        <div className="shadow-text mb-0.5 text-base font-bold">
          {user?.displayName || user?.username}
          {user?.birthday ? `, ${calculateAge(`${user?.birthday}`)}` : ""}
        </div>
        <div className="text-xs-plus capitalize">{user?.gender && user.gender}</div>
        <div className="mt-2 flex gap-2">
          {horoscope && horoscope !== "--" && (
            <span className="rounded-3xl bg-white/[0.06] px-4 py-2 text-center backdrop-blur-[50px]">
              {getHoroscopeIcon(horoscope)} {horoscope}
            </span>
          )}
          {zodiac && zodiac !== "--" && (
            <span className="rounded-3xl bg-white/[0.06] px-4 py-2 text-center backdrop-blur-[50px]">
              {getZodiacIcon(zodiac)} {zodiac}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
