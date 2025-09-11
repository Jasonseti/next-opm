/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      if (window.innerWidth < 1280) {
        return "lg";
      }
      return "xl";
    };

    setMode(getMode());
    window.addEventListener("resize", () => setMode(getMode()));
    return () => window.removeEventListener("resize", () => setMode(getMode()));
  }, []);

  return (
    <>
      <div
        className={clsx(
          "w-full h-full absolute",
          "bg-cover bg-top lg:bg-center bg-no-repeat"
        )}
        style={{
          backgroundImage:
            bg_mode && `url('/background/opm-bg-${bg_mode}.jpg')`,
        }}
      ></div>

      <div className="absolute bottom-[3%] right-[1.5%] bg-white/70 hover:bg-white/50 rounded-[5px] select-none">
        <Link href="/download" target="_blank" className="cursor-pointer">
          <img
            src="/icon/download.svg"
            alt="download_icon"
            className="min-w-[30px] w-[4vw] max-w-[40px] aspect-square"
          ></img>
        </Link>
      </div>
    </>
  );
}
