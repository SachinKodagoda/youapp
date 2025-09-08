"use client";
import AboutFormElement from "@/components/about-form/about-form-element";

import AboutSelect from "./about-select";

import AboutDate from "./about-date";

export default function AboutForm() {
  return (
    <form className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3">
      <AboutFormElement label="Display name" placeholder="Enter name" />
      <AboutSelect label="Gender" placeholder="Select Gender" />
      <AboutFormElement label="Birthday" placeholder="DD MM YYYY" />
      <AboutFormElement label="Horoscope" placeholder="--" />
      <AboutFormElement label="Zodiac" placeholder="--" />
      <AboutFormElement label="Height" placeholder="Add height" />
      <AboutFormElement label="Weight" placeholder="Add weight" />
      <AboutDate label="Birthday" placeholder="DD MM YYYY" />
    </form>
  );
}
