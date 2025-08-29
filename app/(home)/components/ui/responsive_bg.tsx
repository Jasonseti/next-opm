"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ResponsiveBackground() {
  const [bg_mode, setMode] = useState<string>();
  useEffect(() => {
    const getMode = () => {
      if (window.innerWidth < 640) {
        return "sm";
      }
      if (window.innerWidth < 1024) {
        return "md";
      }
      if (window.innerWidth < 1536) {
        return "lg";
      }
      return "xl";
    };

    setMode(getMode());
    window.addEventListener("resize", () => setMode(getMode()));
    return () => window.removeEventListener("resize", () => setMode(getMode()));
  }, []);

  return (
    <div
      className={clsx(
        "w-full h-full absolute",
        "bg-cover bg-top 2xl:bg_top lg:bg-center bg-no-repeat"
      )}
      style={{
        backgroundImage: bg_mode && `url('/background/opm_bg_${bg_mode}.jpg')`,
      }}
    ></div>
  );
}
