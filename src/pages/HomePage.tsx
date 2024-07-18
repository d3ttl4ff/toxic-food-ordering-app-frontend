import landingImage from "../assets/landing3.png";
import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 backdrop-blur-md bg-white/50 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-limeTheme-base_600">
          Give in to your toxic snack today!
        </h1>
        <span className="text-xl">Food is just a heart attack away!</span>
        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="landing image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Reach your dose of toxins even faster!
          </span>
          <span>
            Download the ToxicEats App for faster ordering and personilized
            kidney failure recommendations
          </span>
          <img
            src={appDownload}
            alt="app download image"
            className="w-2/3 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
