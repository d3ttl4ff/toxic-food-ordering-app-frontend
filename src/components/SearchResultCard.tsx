import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { GlareCard } from "./uiAceternity/glare-card";

type Props = {
  restaurant: Restaurant;
};

type SectionProps = {
  children: React.ReactNode;
  center?: boolean;
};

const SearchResultCard = ({ restaurant }: Props) => {
  const Section = ({ children }: SectionProps, center = false) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView]);

    const revealVariants = {
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
      <motion.div
        ref={ref}
        variants={revealVariants}
        initial="hidden"
        animate={controls}
        className={center ? "flex items-center" : ""}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid md:grid-cols-[2fr_3fr] gap-5 group"
    >
      <Section>
        <GlareCard>
          <AspectRatio ratio={16 / 6}>
            {/* <img
            src={restaurant.imageUrl}
            alt="restaurant image"
            className="rounded-md w-full h-full object-cover"
          /> */}
            <img
              src={restaurant.imageUrl}
              alt="restaurant image"
              className="rounded-md w-full h-full object-cover"
            />
          </AspectRatio>
        </GlareCard>
      </Section>
      <div>
        <Section center>
          <h3 className="text-2xl font-semibold tracking-tight mb-2 group-hover:font-bold group-hover:text-ownTheme-base_600 transition-all">
            {restaurant.restaurantName}
          </h3>
        </Section>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <Section>
            <div className="flex flex-row flex-wrap">
              {restaurant.cuisines.map((item, index) => (
                <span className="flex">
                  <span>{item}</span>
                  {index < restaurant.cuisines.length - 1 && <Dot />}
                </span>
              ))}
            </div>
          </Section>
          <div className="flex gap-2 flex-col">
            <Section>
              <div className="flex items-center gap-1 text-ownTheme-base_600">
                <Clock className="text-ownTheme-base_600" />
                {restaurant.estimatedDeliveryTime} mins
              </div>
            </Section>
            <Section>
              <div className="flex items-center gap-1">
                <Banknote />
                Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
