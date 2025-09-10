import BackButton from "@/components/back-button";
import UserMenu from "@/components/user-menu";

interface HeaderProps {
  onBack: () => void;
  onLogout: () => void;
  showBackButton: boolean;
  username?: string;
}

export default function Header({ onBack, onLogout, showBackButton, username }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <BackButton onBack={onBack} visible={showBackButton} />
      <div className="flex flex-auto justify-center">{username}</div>
      <UserMenu onLogout={onLogout} />
    </div>
  );
}
