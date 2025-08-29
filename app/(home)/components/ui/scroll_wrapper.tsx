"use client";
// import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { header_font } from "../../../fonts";

export default function ScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scroll_wrapper = useRef<HTMLDivElement>(null);
  // const fader = useRef<HTMLDivElement>(null);
  const [is_shift, setShift] = useState<boolean>(false);

  useEffect(() => {
    const wrapper = scroll_wrapper.current;
    const scroll_speed = is_shift ? 8.0 : 3.0;
    const updateScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (wrapper) {
        wrapper.scrollTo({
          top: 0,
          left: wrapper.scrollLeft + event.deltaY * scroll_speed,
          behavior: "smooth",
        });
        // if (wrapper.scrollLeft + event.deltaY < 0) {
        //   (fader.current as HTMLElement).classList.remove("animate-wiggle");
        //   void (fader.current as HTMLElement).offsetHeight;
        //   (fader.current as HTMLElement).classList.add("animate-wiggle");
        // }
      }
    };

    const handleShift = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        event.preventDefault();
        setShift(true);
      }
    };

    wrapper?.addEventListener("wheel", updateScroll);
    window.addEventListener("keydown", handleShift);
    window.addEventListener("keyup", () => setShift(false));
    return () => {
      wrapper?.removeEventListener("wheel", updateScroll);
      window.removeEventListener("keydown", handleShift);
      window.removeEventListener("keyup", () => setShift(false));
    };
  });

  return (
    <div>
      <div
        ref={scroll_wrapper}
        className="w-[90%] h-[max(min(45vw,450px),45px)] sm:h-[max(min(34.2vw,342px),34.2px)] lg:h-[max(min(30vw,300px),30px)] m-auto mt-[20px] relative flex overflow-x-scroll no-scrollbar"
      >
        {/* <div
          ref={fader}
          className={clsx(
            "animate-wiggle w-[10%] float-left h-full absolute z-50",
            "bg-white/50 opacity-0 bg-gradient-to-r from-slate-50 to-transparent"
          )}
        ></div> */}
        {children}
      </div>
      <div
        className={`${header_font.className} italic relative left-[6%] font-[500] mt-[2px] text-m`}
      >
        Tip: Hold Shift for Faster Scrolling
      </div>
    </div>
  );
}
