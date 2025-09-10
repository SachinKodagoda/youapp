"use client";
import Loader from "@/components/elements/loader";
import BackImage from "@assets/images/back-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface Option {
  value: string;
  label: string;
}

const interestOptions: Option[] = [
  { label: "Music", value: "music" },
  { label: "Sports", value: "sports" },
  { label: "Cooking", value: "cooking" },
  { label: "Reading", value: "reading" },
  { label: "Travel", value: "travel" },
  { label: "Photography", value: "photography" },
];

export default function Interest() {
  const [selectedInterests, setSelectedInterests] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const handleChange = (newValue: MultiValue<Option>) => {
    setSelectedInterests(Array.from(newValue || []));
  };

  const getUserData = async () => {
    try {
      setIsLoading(true);
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
      const interests = data.user?.interests || [];
      const interestOptions = interests.map((interest: string) => ({
        label: interest,
        value: interest.toLowerCase(),
      }));
      setSelectedInterests(interestOptions);
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onSave = () => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    const token = localStorage.getItem("token");
    setIsUpdating(true);
    fetch("/api/update-profile", {
      body: JSON.stringify({
        interests: selectedInterests.map((interest) => interest.label),
        userId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((response) => response.json())
      .then(() => {
        setIsUpdating(false);
        router.push("/home");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again later.");
      });
  };

  return (
    <main className="container flex min-h-dvh flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <div
          className="flex w-14 cursor-pointer gap-2 text-sm font-bold"
          onClick={() => {
            router.push("/home");
          }}
        >
          <Image src={BackImage} width={7} height={14} alt="back icon" className="w-auto" />
          Back
        </div>
        <div
          className="blue-text flex w-11 cursor-pointer items-center justify-end gap-1 text-sm font-semibold"
          onClick={onSave}
        >
          {isUpdating && <Loader size={15} />} Save
        </div>
      </div>
      <div className="mt-10">
        <div className="gold-text mb-3 text-sm font-bold">Tell everyone about yourself</div>
        <div className="flex items-center gap-2 text-xl font-bold">
          What interest you? {isLoading && <Loader size={15} />}
        </div>
      </div>
      <div>
        <CreatableSelect
          isMulti
          value={selectedInterests}
          onChange={handleChange}
          options={interestOptions}
          placeholder=""
          formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          instanceId="interest-select"
          unstyled
          components={{
            ClearIndicator: () => null,
            DropdownIndicator: () => null,
          }}
          classNames={{
            clearIndicator: () => "text-gray-400 hover:text-white cursor-pointer p-2",
            control: () =>
              "bg-gray-900 text-white min-h-[50px] rounded-md px-3 py-2 bg-[#D9D9D90F]",
            dropdownIndicator: () => "text-gray-400 hover:text-white cursor-pointer p-2",
            indicatorsContainer: () => "flex items-center",
            input: () => "text-white",
            menu: () =>
              "bg-gray-900 border border-gray-600 rounded-md mt-1 shadow-lg overflow-hidden",
            multiValue: () => "rounded px-2 py-1 m-1 bg-[#FFFFFF1A]",
            multiValueLabel: () => "text-white text-sm ",
            multiValueRemove: () => "text-gray-300 hover:text-white ml-1 cursor-pointer",
            option: ({ isFocused }) =>
              `px-3 py-2 text-white cursor-pointer ${
                isFocused ? "bg-gray-700" : "bg-gray-900 hover:bg-gray-700"
              }`,
            placeholder: () => "text-gray-500",
            valueContainer: () => "flex flex-wrap gap-0 p-1",
          }}
          className="mb-4"
        />
      </div>
    </main>
  );
}
