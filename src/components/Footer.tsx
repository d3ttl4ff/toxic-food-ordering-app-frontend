import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-limeTheme-base_500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight hover:text-limeTheme-selection_base transition-all">
          ToxicEats
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <Link
            to="/"
            className="hover:text-limeTheme-selection_base transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            to="/"
            className="hover:text-limeTheme-selection_base transition-all"
          >
            Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
}
