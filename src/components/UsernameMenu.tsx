import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function UsernameMenu() {
  const CALLBACK_URL = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const { user, logout } = useAuth0();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger
        className="flex items-center px-3 font-bold hover:text-ownTheme-base_500 gap-2 focus:outline-none transition-all"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <CircleUserRound className="text-ownTheme-base_500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-ownTheme-base_500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-bold hover:text-ownTheme-base_500"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() =>
              logout({ logoutParams: { returnTo: CALLBACK_URL } })
            }
            className="flex flex-1 font-bold bg-ownTheme-base_500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
