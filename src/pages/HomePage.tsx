import landingImage from "../assets/main images/landing3.webp";
import appDownload from "../assets/main images/appDownload.png";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/uiAceternity/background-beams";
import { CanvasRevealEffectCard } from "@/components/uiAceternity/CanvasRevealEffectCard";

import beans from "../assets/cuisineImages/beansLime.webp";
import book from "../assets/cuisineImages/bookLime.webp";
import cauldron from "../assets/cuisineImages/cauldronLime.webp";
import cookies from "../assets/cuisineImages/cookiesLime.webp";
import gem from "../assets/cuisineImages/gemLime.webp";
import herbs from "../assets/cuisineImages/herbsLime.webp";
import owl from "../assets/cuisineImages/owlLime.webp";
import potion from "../assets/cuisineImages/potionLime.webp";
import puff from "../assets/cuisineImages/puffLime.webp";
import rose from "../assets/cuisineImages/roseLime.webp";
import staff from "../assets/cuisineImages/staffLime.webp";
import tea from "../assets/cuisineImages/teaLime.webp";
import toffee from "../assets/cuisineImages/toffeeLime.webp";
import windowvamp from "../assets/cuisineImages/windowLime.webp";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  // const navigate = useNavigate();

  // const handleSearchSubmit = (searchFormValues: SearchForm) => {
  //   navigate({
  //     pathname: `/search/${searchFormValues.searchQuery}`,
  //   });
  // };

  const cuisineImageList = [
    beans,
    book,
    cauldron,
    cookies,
    gem,
    herbs,
    owl,
    potion,
    puff,
    rose,
    staff,
    tea,
    toffee,
    windowvamp,
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 relative bg-limeTheme-base_500 dark:backdrop-blur-3xl dark:bg-white/10 rounded-lg shadow-md py-8 text-center">
        <div className="z-10 flex flex-col gap-5">
          <h1 className="relative text-3xl md:text-5xl font-bold tracking-tight text-white dark:text-limeTheme-base_500">
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

      <div className="flex flex-col items-center gap-5 my-8">
        <div className="text-lg mb-5">
          Now{" "}
          <span className="text-limeTheme-base_500 hover:font-bold transition-all">
            available
          </span>{" "}
          in these regions!
        </div>
        <CanvasRevealEffectCard />
      </div>

      <Separator />

      <div className="md:px-32 relative bg-limeTheme-selection_base dark:backdrop-blur-3xl dark:bg-white/10 rounded-lg shadow-md py-8 text-center overflow-hidden my-8">
        <div className="flex gap-3 items-center justify-center">
          {cuisineImageList.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="cuisine image"
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
        <BackgroundBeams />
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
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
