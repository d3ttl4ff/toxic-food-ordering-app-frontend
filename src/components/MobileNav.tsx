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
          <Menu className="text-limeTheme-base_500" />
        </SheetTrigger>
        <ThemeSwitcher />
        <SheetContent className="space-y-3">
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-limeTheme-base_500" />
                {user?.email}
              </span>
            ) : (
              <span>Welcome to ToxicEats</span>
            )}
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex flex-col gap-4">
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                className="flex-1 font-bold bg-limeTheme-base_500"
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
