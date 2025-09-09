"use client";
import { User } from "@/types/user";
import BackImage from "@assets/images/back-icon.svg";
import MenuIcon from "@assets/images/menu-icon.svg";
import DetailCard from "@components/detail-card";
import EditAbout from "@components/edit-about";
import ProfileCard from "@components/profile-card";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [isInitial, setIsInitial] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [horoscope, setHoroscope] = useState("--");
  const [zodiac, setZodiac] = useState("--");

  const getUserData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/get-profile?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const data = await response.json();
      setUser(data.user);
      setZodiac(data.user?.zodiac || "--");
      setHoroscope(data.user?.horoscope || "--");
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container-black flex min-h-dvh flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <div className="flex w-14 cursor-pointer gap-2 text-sm font-bold">
          <Image src={BackImage} width={7} height={14} alt="back icon" className="w-auto" />
          Back
        </div>

        <div className="flex flex-auto justify-center">{user?.username}</div>
        <div className="flex w-11 justify-end">
          <Image src={MenuIcon} width={22} height={7} alt="back icon" className="h-full w-auto" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ProfileCard user={user} horoscope={horoscope} zodiac={zodiac} />
        {isInitial ? (
          <DetailCard
            title="About"
            detail="Add in your your to help others know you better"
            onEdit={() => setIsInitial((val) => !val)}
            user={user}
            horoscope={horoscope}
            zodiac={zodiac}
          />
        ) : (
          <EditAbout
            onEdit={() => {
              getUserData();
              setIsInitial((val) => !val);
            }}
            user={user}
          />
        )}

        <DetailCard title="Interest" detail="Add in your interest to find a better match" />
      </div>
    </main>
  );
}
