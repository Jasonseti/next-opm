"use client";
import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { ContextType, SettingsContext } from "../../state_provider";

export default function NavDrawer({ children }: { children: React.ReactNode }) {
  const settings: ContextType = useContext(SettingsContext);
  const wrapper_ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const target_element = document.getElementById(
      "navigator_page_" + settings.current_page.state
    );
    if (wrapper_ref.current && target_element)
      wrapper_ref.current.scrollTo({
        left: target_element.offsetLeft - wrapper_ref.current.clientWidth / 3,
        behavior: "smooth",
      });
  }, [settings.current_page.state]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (wrapper_ref.current)
        wrapper_ref.current?.scrollTo({
          left: wrapper_ref.current.scrollLeft + e.deltaY * 3,
          behavior: "smooth",
        });
    };

    wrapper_ref.current?.addEventListener("wheel", handleScroll);
    return () =>
      // eslint-disable-next-line react-hooks/exhaustive-deps
      wrapper_ref.current?.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <section
      ref={wrapper_ref}
      className={clsx(
        "sm:flex hidden",
        "fixed bottom-[5%] left-[5%] w-[90%] lg:left-[10%] lg:w-[80%] h-[min(27vw,300px)]",
        "bg-gradient-to-t from-40% to-100% from-[#131b36] to-black/0 text-gray-200",
        !settings.is_header_open.state &&
          "translate-y-1/1 opacity-0 pointer-events-none select-none",
        "transition duration-400",
        // "mask-x-from-90% mask-x-to-100%",
        "overflow-x-auto overflow-y-hidden custom-navigator-scrollbar z-20"
      )}
    >
      {children}
    </section>
  );
}
