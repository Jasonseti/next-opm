"use client";
import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";

export default function NavDrawer({ children }: { children: React.ReactNode }) {
  const states: StatesTypes = useContext(StatesContext);
  const wrapper_ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = wrapper_ref.current;
    const target_element = document.getElementById(
      "navigator_page_" + states.current_page.state
    );
    if (wrapper && target_element)
      wrapper.scrollTo({
        left:
          -wrapper.clientHeight * 0.3 +
          target_element.offsetLeft -
          wrapper.clientWidth / 2,
        behavior: "smooth",
      });
  }, [states.current_page.state]);

  useEffect(() => {
    const wrapper = wrapper_ref.current;
    const handleScroll = (e: WheelEvent) => {
      if (wrapper)
        wrapper.scrollTo({
          left: wrapper.scrollLeft + e.deltaY * (window.innerWidth / 250),
          behavior: "smooth",
        });
    };

    wrapper?.addEventListener("wheel", handleScroll);
    return () => wrapper?.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <section
      ref={wrapper_ref}
      className={clsx(
        "sm:flex hidden w-[90vw] xl:w-[min(80vw,1400px)] aspect-[3/1] lg:aspect-[4/1]",
        "fixed left-0 right-0 bottom-[5%] mx-auto",
        "overflow-x-scroll overflow-y-hidden custom-navigator-scrollbar z-10",
        "bg-gradient-to-t from-40% to-100% from-[#131b36] to-black/0 text-gray-200",
        !states.is_header_open.state &&
          "translate-y-1/1 opacity-0 pointer-events-none select-none",
        "transition duration-400"
        // "mask-x-from-90% mask-x-to-100%"
      )}
    >
      {children}
    </section>
  );
}
