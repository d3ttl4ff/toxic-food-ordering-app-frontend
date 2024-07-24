"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

import velenImg from "@/assets/cityImages/velen.webp";
import novigradImg from "@/assets/cityImages/novigrad.webp";
import vizimaImg from "@/assets/cityImages/vizima.webp";
import siofraImg from "@/assets/cityImages/siofra.webp";

import {
  GiAmmonite,
  GiAmmoniteFossil,
  GiBarbedCoil,
  GiBattleAxe,
} from "react-icons/gi";

export function CanvasRevealEffectCard() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 justify-between">
        <Card
          title="Velen"
          subTitle="Hover over me"
          icon={<GiAmmonite size={45} color="FFFFFF" />}
          bgImage={velenImg}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-background"
            colors={[
              [163, 230, 53],
              [101, 163, 13],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-background/50 dark:bg-background/90" />
        </Card>
        <Card
          title="Novigrad"
          subTitle="Hover over me"
          icon={<GiAmmoniteFossil size={45} color="FFFFFF" />}
          bgImage={novigradImg}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-background"
            colors={[
              [163, 230, 53],
              [101, 163, 13],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-background/50 dark:bg-background/90" />
        </Card>
        <Card
          title="Vizima"
          subTitle="Hover over me"
          icon={<GiBarbedCoil size={45} color="FFFFFF" />}
          bgImage={vizimaImg}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-background"
            colors={[
              [163, 230, 53],
              [101, 163, 13],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-background/50 dark:bg-background/90" />
        </Card>
        <Card
          title="Siofra"
          subTitle="Hover over me"
          icon={<GiBattleAxe size={45} color="FFFFFF" />}
          bgImage={siofraImg}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-background"
            colors={[
              [163, 230, 53],
              [101, 163, 13],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-background/50 dark:bg-background/90" />
        </Card>
      </div>
    </>
  );
}

const Card = ({
  title,
  subTitle,
  icon,
  children,
  bgImage,
}: {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  bgImage?: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-limeTheme-base_600 group/canvas-card flex items-center justify-center dark:border-foreground/[0.2]  max-w-sm w-80 mx-auto p-4 relative h-[25rem]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-foreground text-slate-900" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-foreground text-slate-900" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-foreground text-slate-900" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-foreground text-slate-900" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-center dark:text-foreground text-2xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black font-bold group-hover/canvas-card:text-foreground group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <div className="text-white text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
