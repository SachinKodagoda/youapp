"use client";

import Header from "@/components/header";
import LoadingSpinner from "@/components/loading-spinner";
import MainContent from "@/components/main-content";
import { useAuth } from "@/hooks/use-auth";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useViewToggle } from "@/hooks/use-view-toggle";

export default function Page() {
  const { authUser, isAuthenticated, logout } = useAuth();
  const { horoscope, isLoading, refetchUserData, user, zodiac } = useUserProfile();
  const { isInitialView, toggleView } = useViewToggle();

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  // Auth hook handles redirect for unauthenticated users
  if (!authUser || isAuthenticated === false) {
    return null;
  }

  return (
    <main className="container-black flex min-h-dvh flex-col gap-8 p-4">
      <Header
        onBack={toggleView}
        onLogout={logout}
        showBackButton={!isInitialView}
        username={authUser.username}
      />

      <MainContent
        horoscope={horoscope}
        isInitialView={isInitialView}
        isLoading={isLoading}
        onRefreshUser={refetchUserData}
        onToggleView={toggleView}
        user={user}
        zodiac={zodiac}
      />
    </main>
  );
}
