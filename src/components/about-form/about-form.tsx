"use client";
import AboutFormElement from "@/components/about-form/about-form-element";

import AboutSelect from "./about-select";

import { lengthList, weightList } from "@/data/measure-list";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AboutDate from "./about-date";
import AboutMeasureElement from "./about-measure-element";

export default function AboutForm() {
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
            setZodiac(data?.zodiac);
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

  return (
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
  );
}
