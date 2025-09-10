import AboutCard from "@/components/about-card";
import AboutCardEdit from "@/components/about-card-edit";
import InterestCard from "@/components/interest-card";
import ProfileCard from "@/components/profile-card";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface MainContentProps {
  user: User | null;
  horoscope: string;
  zodiac: string;
  isLoading: boolean;
  isInitialView: boolean;
  onToggleView: () => void;
  onRefreshUser: () => void;
}

export default function MainContent({
  horoscope,
  isInitialView,
  isLoading,
  onRefreshUser,
  onToggleView,
  user,
  zodiac,
}: MainContentProps) {
  const router = useRouter();

  const handleEditComplete = () => {
    onRefreshUser();
    onToggleView();
  };

  const handleInterestEdit = () => {
    router.push("/interest");
  };

  return (
    <div className="flex flex-col gap-4">
      <ProfileCard user={user} horoscope={horoscope} zodiac={zodiac} loading={isLoading} />

      {isInitialView ? (
        <AboutCard
          onEdit={onToggleView}
          user={user}
          horoscope={horoscope}
          zodiac={zodiac}
          loading={isLoading}
        />
      ) : (
        <AboutCardEdit onEdit={handleEditComplete} user={user} />
      )}

      <InterestCard
        loading={isLoading}
        interests={user?.interests || []}
        onEdit={handleInterestEdit}
      />
    </div>
  );
}
