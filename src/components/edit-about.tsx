"use client";
import { lengthList, weightList } from "@/data/measure-list";
import { User } from "@/types/user";
import AddImage from "@components/add-image";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AboutDate from "./about-form/about-date";
import AboutFormElement from "./about-form/about-form-element";
import AboutMeasureElement from "./about-form/about-measure-element";
import AboutSelect from "./about-form/about-select";

type TProps = { onEdit?: () => void; user?: User | null };

export default function EditAbout({ onEdit, user }: TProps) {
  const [zodiac, setZodiac] = useState("--");
  const [horoscope, setHoroscope] = useState("--");
  const [birthday, setBirthday] = useState<Date | undefined>(
    user?.birthday ? new Date(user.birthday) : undefined,
  );
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [height, setHeight] = useState(
    user?.height || {
      amount: 0,
      unit: "inch",
    },
  );
  const [weight, setWeight] = useState(
    user?.weight || {
      amount: 0,
      unit: "kg",
    },
  );
  useEffect(() => {
    const fetchZodiac = async () => {
      if (birthday) {
        try {
          const formattedDate = format(birthday, "yyyy-MM-dd");
          const response = await fetch(`/api/zodiac?date=${formattedDate}`);
          const data = await response.json();
          if (data.zodiac) {
            setZodiac(data?.zodiac?.sign);
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
    fetchZodiac();
  }, [birthday]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setBirthday(undefined);
    } else {
      setBirthday(date);
    }
  };

  const onSubmit = async () => {
    const profileData = {
      birthday: birthday ? format(birthday, "yyyy-MM-dd") : null,
      displayName,
      gender,
      height,
      horoscope,
      weight,
      zodiac,
    };

    try {
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/update-profile`, {
        body: JSON.stringify({
          userId,
          ...profileData,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Profile updated successfully!");
      if (onEdit) onEdit();
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="detail-card relative flex flex-col gap-7 rounded-2xl p-4 text-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="font-bold">About</div>
        <div className="gold-text cursor-pointer font-[500]" onClick={onSubmit}>
          Save & Update
        </div>
      </div>
      <AddImage />
      <form className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3">
        <AboutFormElement
          label="Display name"
          placeholder="Enter name"
          value={displayName}
          onChange={(value) => setDisplayName(value)}
        />
        <AboutSelect
          label="Gender"
          placeholder="Select Gender"
          value={gender}
          onChange={(value) => setGender(value)}
        />
        <AboutDate
          label="Birthday"
          placeholder="DD MM YYYY"
          value={birthday}
          onChange={handleDayPickerSelect}
        />
        <AboutFormElement label="Horoscope" placeholder={horoscope} />
        <AboutFormElement label="Zodiac" placeholder={zodiac} />
        <AboutMeasureElement
          label="Height"
          placeholder="Add height"
          value={height}
          onChange={(value) => setHeight(value)}
          measureList={lengthList}
        />
        <AboutMeasureElement
          label="Weight"
          placeholder="Add weight"
          value={weight}
          onChange={(value) => setWeight(value)}
          measureList={weightList}
        />
      </form>
    </div>
  );
}
