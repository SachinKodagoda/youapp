"use client";
import { User } from "@/types/user";
import BackImage from "@assets/images/back-icon.svg";
import MenuIcon from "@assets/images/menu-icon.svg";
import DetailCard from "@components/detail-card";
import EditAbout from "@components/edit-about";
import ProfileCard from "@components/profile-card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [isInitial, setIsInitial] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [horoscope, setHoroscope] = useState("--");
  const [zodiac, setZodiac] = useState("--");

  const fetchZodiac = async (birthday: Date | null) => {
    if (birthday) {
      try {
        const formattedDate = format(birthday, "yyyy-MM-dd");
        const response = await fetch(`/api/zodiac?date=${formattedDate}`);
        const data = await response.json();
        if (data.zodiac) {
          setZodiac(data?.zodiac?.sign || "--");
        } else {
          setZodiac("--");
        }
        if (data.horoscope) {
          setHoroscope(data.horoscope?.sign || "--");
        } else {
          setHoroscope("--");
        }
      } catch {
        setZodiac("--");
        setHoroscope("--");
      }
    } else {
      setZodiac("--");
      setHoroscope("--");
    }
  };

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
      fetchZodiac(data.user?.birthday ? new Date(data.user.birthday) : null);
    } catch {
      // toast.error("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="container-black flex min-h-screen flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex w-14 cursor-pointer gap-2 text-sm font-bold">
            <Image src={BackImage} width={7} height={14} alt="back icon" className="w-auto" />
            Back
          </div>
        </Link>

        <div className="flex flex-auto justify-center">{user?.username}</div>
        <div className="flex w-11 justify-end">
          <Image src={MenuIcon} width={22} height={6} alt="back icon" className="w-auto" />
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
          <EditAbout onEdit={() => setIsInitial((val) => !val)} />
        )}

        <DetailCard title="Interest" detail="Add in your interest to find a better match" />
      </div>
    </main>
  );
}
