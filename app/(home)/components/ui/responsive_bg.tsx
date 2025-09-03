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
    <>
      <div
        className={clsx(
          "w-full h-full absolute",
          "bg-cover bg-top 2xl:bg_top lg:bg-center bg-no-repeat"
        )}
        style={{
          backgroundImage:
            bg_mode && `url('/background/opm_bg_${bg_mode}.jpg')`,
        }}
      ></div>
      <div className="absolute z-20 bottom-[3%] right-[1.5%]">
        <Link
          href="/download"
          target="_blank"
          className="cursor-pointer peer float-right"
        >
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src="/icon/download.svg"
            alt="download_icon"
            className="bg-white/70 w-[max(min(4vw,40px),30px)] rounded-[5px] hover:bg-gray-500/30 h-[max(min(4vw,40px),30px)]"
          ></img>
        </Link>
        {/* <p className="relative -translate-y-1/1 text-nowrap px-[min(1vw,10px)] flex-none bottom-[min(0.5vw,5px)] bg-white rounded-[5px] text-m peer-hover:opacity-100 opacity-0 transition-all duration-200 pointer-events-none select-none">
          Download This Image
        </p> */}
      </div>
    </>
  );
}
