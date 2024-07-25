import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        className="flex text-slate-900/95 dark:text-white/95 items-center font-bold hover:text-white/95 dark:hover:text-ownTheme-base_500"
        to={"/order-status"}
      >
        Order Status
      </Link>
      <Link
        className="flex text-slate-900/95 dark:text-white/95 items-center font-bold hover:text-white/95 dark:hover:text-ownTheme-base_500"
        to={"/manage-restaurant"}
      >
        My Restaurant
      </Link>
      <Link
        className="flex text-slate-900/95 dark:text-white/95 items-center font-bold hover:text-white/95 dark:hover:text-ownTheme-base_500"
        to={"/user-profile"}
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
}
