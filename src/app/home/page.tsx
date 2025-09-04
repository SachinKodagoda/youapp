"use client";
import BackImage from "@assets/images/back-icon.svg";
import MenuIcon from "@assets/images/menu-icon.svg";
import DetailCard from "@components/detail-card";
import EditAbout from "@components/edit-about";
import ProfileCard from "@components/profile-card";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [isInitial, setIsInitial] = useState(true);
  return (
    <main className="container-black flex min-h-screen flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <nav className="flex w-14 gap-2 text-sm font-bold">
          <Image src={BackImage} width={7} height={14} alt="back icon" />
          Back
        </nav>
        <div className="flex flex-auto justify-center">@johndoe</div>
        <div className="flex w-11 justify-end">
          <Image src={MenuIcon} width={22} height={6} alt="back icon" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ProfileCard />
        {isInitial ? (
          <DetailCard
            title="About"
            detail="Add in your your to help others know you better"
            onEdit={() => setIsInitial((val) => !val)}
          />
        ) : (
          <EditAbout onEdit={() => setIsInitial((val) => !val)} />
        )}

        <DetailCard title="Interest" detail="Add in your interest to find a better match" />
      </div>
    </main>
  );
}
