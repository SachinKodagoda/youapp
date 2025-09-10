import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/elements/dropdown-menu";
import { UI_TEXT } from "@/constants/ui-text";
import MenuIcon from "@assets/images/menu-icon.svg";
import { LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";

interface UserMenuProps {
  onLogout: () => void;
}

export default function UserMenu({ onLogout }: UserMenuProps) {
  return (
    <div className="flex w-11 justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Image
            src={MenuIcon}
            width={22}
            height={7}
            alt="menu icon"
            className="h-full w-auto outline-none"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 border-0 bg-[#162329] text-white">
          <DropdownMenuItem className="outline-none">
            <UserIcon />
            {UI_TEXT.PROFILE}
          </DropdownMenuItem>
          <DropdownMenuItem className="outline-none" onClick={onLogout}>
            <LogOut />
            {UI_TEXT.LOGOUT}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
