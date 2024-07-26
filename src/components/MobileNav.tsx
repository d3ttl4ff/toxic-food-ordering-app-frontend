import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import ThemeSwitcher from "./ThemeSwitcher";

export default function MobileNav() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <div className="flex items-center gap-4">
        <SheetTrigger>
          <Menu className="text-ownTheme-base_500" />
        </SheetTrigger>
        <ThemeSwitcher />
        <SheetContent className="space-y-3 bg-white/60 supports-backdrop-blur:bg-white/60 dark:bg-slate-900/50 backdrop-blur-md">
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-ownTheme-base_500" />
                {user?.email}
              </span>
            ) : (
              <span>Welcome to CozmicEats</span>
            )}
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex flex-col gap-4">
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                className="flex-1 font-bold bg-ownTheme-base_500"
              >
                Log In
              </Button>
            )}
          </SheetDescription>
        </SheetContent>
      </div>
    </Sheet>
  );
}
