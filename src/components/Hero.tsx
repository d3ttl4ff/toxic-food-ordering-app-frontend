import { motion } from "framer-motion";
import hero from "../assets/main images/hero6.jpg";
import { LampContainer } from "./uiAceternity/lamp";

export default function Hero() {
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
          className="mt-10 bg-gradient-to-br from-limeTheme-selection_base dark:from-foreground to-limeTheme-selection_base dark:to-foreground py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          "Consume away the will" <br /> Savor the vile{" "}
          <span className="text-limeTheme-base_500">blood</span>
        </motion.h1>
      </LampContainer>
    </div>
  );
}
