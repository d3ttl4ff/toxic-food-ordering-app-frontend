import { motion } from "framer-motion";
// import hero from "../assets/main images/hero6.jpg";
import { LampContainer } from "./uiAceternity/lamp";
import SearchBar, { SearchForm } from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div>
      {/* <img
        src={hero}
        alt="hero image"
        className="w-full max-h-[600px] object-cover"
      /> */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mx-5 bg-gradient-to-br from-ownTheme-selection_base dark:from-foreground to-ownTheme-selection_base dark:to-foreground py-4 bg-clip-text text-center text-4xl md:text-6xl font-medium tracking-tight text-transparent"
        >
          <div className="flex flex-col">
            <span>"Consume away the will"</span>
            <div>
              Savor the vile{" "}
              <span className="text-ownTheme-base_500">blood</span>
            </div>
          </div>
        </motion.h1>
        <div className="z-10 mx-5 md:mx-40 absolute flex flex-col">
          <div className="h-[26vh] max-h-[200px] relative"></div>
          <SearchBar
            placeholder="Search by City or Town"
            onSubmit={handleSearchSubmit}
          />
        </div>
      </LampContainer>
    </div>
  );
}
