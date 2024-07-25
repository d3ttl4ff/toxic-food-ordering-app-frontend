import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 border-[1px] border-slate-900/10 dark:border-slate-300/10 py-4 backdrop-blur-md w-[80vw] max-w-[1229px] mt-5 rounded-full left-1/2 transform -translate-x-1/2 transition-colors duration-500 ${
        isScrolled
          ? "bg-white/70 supports-backdrop-blur:bg-white/90 dark:bg-slate-900/60"
          : "bg-white/60 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-ownTheme-base_500"
        >
          ToxicEats
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
}
