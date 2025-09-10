"use client";
import Loader from "@/components/elements/loader";
import InterestHeader from "@/components/interest-header";
import InterestSelector from "@/components/interest-selector";
import { useProfile } from "@/hooks/use-profile";
import type { Option } from "@/types/interest";
import { useRouter } from "next/navigation";
import type { MultiValue } from "react-select";

export default function Interest() {
  const { isLoading, isUpdating, selectedInterests, setSelectedInterests, updateProfile } =
    useProfile();

  const router = useRouter();

  const handleChange = (newValue: MultiValue<Option>) => {
    setSelectedInterests(Array.from(newValue || []));
  };

  const handleSave = async () => {
    const success = await updateProfile(selectedInterests);
    if (success) {
      router.push("/");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <main className="container flex min-h-dvh flex-col gap-8 p-4">
      <InterestHeader isUpdating={isUpdating} onBack={handleBack} onSave={handleSave} />

      <div className="mt-10">
        <div className="gold-text mb-3 text-sm font-bold">Tell everyone about yourself</div>
        <div className="flex items-center gap-2 text-xl font-bold">
          What interest you? {isLoading && <Loader size={15} />}
        </div>
      </div>

      <div>
        <InterestSelector value={selectedInterests} onChange={handleChange} />
      </div>
    </main>
  );
}
