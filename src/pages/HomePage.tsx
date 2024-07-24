import landingImage from "../assets/main images/landing4.webp";
import appDownload from "../assets/main images/appDownload.png";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/uiAceternity/background-beams";
import { CanvasRevealEffectCard } from "@/components/uiAceternity/CanvasRevealEffectCard";

export default function HomePage() {
  // const navigate = useNavigate();

  // const handleSearchSubmit = (searchFormValues: SearchForm) => {
  //   navigate({
  //     pathname: `/search/${searchFormValues.searchQuery}`,
  //   });
  // };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 relative bg-limeTheme-base_500 dark:backdrop-blur-3xl dark:bg-white/10 rounded-lg shadow-md py-8 text-center">
        <div className="z-10 flex flex-col gap-5">
          <h1 className="relative text-3xl md:text-5xl font-bold tracking-tight text-white">
            Give in to your toxic snack today!
          </h1>
          <span className="text-xl">Food is just a heart attack away!</span>
          {/* <SearchBar
            placeholder="Search by City or Town"
            onSubmit={handleSearchSubmit}
          /> */}
        </div>
        <BackgroundBeams />
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="text-lg">
          Now{" "}
          <span className="text-limeTheme-base_500 hover:font-bold transition-all">
            available
          </span>{" "}
          in these regions!
        </div>
        <CanvasRevealEffectCard />
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
