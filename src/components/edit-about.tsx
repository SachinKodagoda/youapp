"use client";
import { lengthList, weightList } from "@/data/measure-list";
import AddImage from "@components/add-image";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AboutDate from "./about-form/about-date";
import AboutFormElement from "./about-form/about-form-element";
import AboutMeasureElement from "./about-form/about-measure-element";
import AboutSelect from "./about-form/about-select";

type TProps = { onEdit?: () => void };

export default function EditAbout({ onEdit }: TProps) {
  const [zodiac, setZodiac] = useState("--");
  const [horoscope, setHoroscope] = useState("--");
  const [birthday, setBirthday] = useState<Date>();

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
    // if (onEdit) onEdit();
    // const formData = new FormData(document.querySelector("form") as HTMLFormElement);
    const profileData = {
      birthday: birthday ? format(birthday, "yyyy-MM-dd") : null,
      // displayName: formData.get("displayName"),
      // gender: formData.get("gender"),
      // height: formData.get("height"),
      // horoscope,
      // weight: formData.get("weight"),
      // zodiac,
    };
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

    const data = await response.json();
    /* eslint-disable-next-line no-console */
    console.log("data: =-->", data);
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
        <AboutFormElement label="Display name" placeholder="Enter name" />
        <AboutSelect label="Gender" placeholder="Select Gender" />
        <AboutDate
          label="Birthday"
          placeholder="DD MM YYYY"
          birthday={birthday}
          handleDayPickerSelect={handleDayPickerSelect}
        />
        <AboutFormElement label="Horoscope" placeholder={horoscope} />
        <AboutFormElement label="Zodiac" placeholder={zodiac} />
        <AboutMeasureElement label="Height" placeholder="Add height" measureList={lengthList} />
        <AboutMeasureElement label="Weight" placeholder="Add weight" measureList={weightList} />
      </form>
    </div>
  );
}
