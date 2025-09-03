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
  const parent_element = useRef<HTMLDivElement>(null);
  const scroll_wrapper = useRef<HTMLDivElement>(null);
  const [left_scroll, setLeftScroll] = useState<number>(0);
  const [is_shift, setShift] = useState<boolean>(false);

  const clip_by = (val: number, max: number) => Math.max(Math.min(val, 0), max);

  useEffect(() => {
    const wrapper = scroll_wrapper.current;
    const scroll_speed = is_shift ? 2.5 : 1.0;
    const updateScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (wrapper && parent_element.current)
        setLeftScroll(
          clip_by(
            left_scroll - event.deltaY * scroll_speed,
            -wrapper.clientWidth + parent_element.current.clientWidth
          )
        );
    };

    wrapper?.addEventListener("wheel", updateScroll);
    window.addEventListener("keydown", () => setShift(true));
    window.addEventListener("keyup", () => setShift(false));
    return () => {
      wrapper?.removeEventListener("wheel", updateScroll);
      window.removeEventListener("keydown", () => setShift(true));
      window.removeEventListener("keyup", () => setShift(false));
    };
  }, [is_shift, left_scroll]);

  return (
    <>
      <div
        ref={parent_element}
        className="w-[90%] h-[max(min(45vw,450px),45px)] sm:h-[max(min(34.2vw,342px),34.2px)] lg:h-[max(min(30vw,300px),30px)] m-auto mt-[20px] relative flex overflow-x-scroll no-scrollbar"
      >
        <div
          ref={scroll_wrapper}
          className="relative flex transition-all duration-400 ease-out"
          style={{ left: left_scroll + "px" }}
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
      </div>
      <div
        className={`${header_font.className} italic relative left-[6%] font-[500] mt-[2px] text-m`}
      >
        Tip: Hold Shift for Faster Scrolling
      </div>
    </>
  );
}
