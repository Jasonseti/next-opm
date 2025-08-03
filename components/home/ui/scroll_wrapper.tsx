"use client";
import { useEffect, useRef } from "react";
import React from "react";

export default function ScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scroll_wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = scroll_wrapper.current;
    const updateScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (wrapper) {
        wrapper.scrollTo({
          top: 0,
          left: wrapper.scrollLeft + event.deltaY * 5,
          behavior: "smooth",
        });
        if (wrapper.scrollLeft + event.deltaY < 0) {
        }
        if (
          Math.floor(wrapper.scrollLeft + wrapper.offsetWidth) + event.deltaY >
          wrapper.scrollWidth
        ) {
        }
      }
    };

    wrapper?.addEventListener("wheel", updateScroll);

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", updateScroll);
      }
    };
  }, []);

  return (
    <div
      ref={scroll_wrapper}
      className="w-[80%] m-auto mt-[20px] flex overflow-x-scroll no-scrollbar"
    >
      {children}
    </div>
  );
}
