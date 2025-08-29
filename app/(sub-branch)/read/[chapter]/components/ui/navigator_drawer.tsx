"use client";
import clsx from "clsx";
import { useContext } from "react";
import { ContextType, SettingsContext } from "../../state_provider";

export default function NavDrawer({ children }: { children: React.ReactNode }) {
  const settings: ContextType = useContext(SettingsContext);

  //   useEffect(() => {
  //     const handleClick = (event: MouseEvent) => {
  //       const book_element = document.getElementById("book_section");
  //       if (book_element && book_element.contains(event.target as HTMLElement)) {
  //         settings(!is_open);
  //       }
  //     };
  //     window.addEventListener("click", handleClick);
  //     return () => window.removeEventListener("click", handleClick);
  //   });

  return (
    <section
      className={clsx(
        "fixed bottom-[5%] left-[5%] w-[90%] lg:left-[10%] lg:w-[80%] h-[min(27vw,300px)]",
        "bg-gradient-to-t from-40% to-100% from-[#131b36] to-black/0 text-gray-200",
        !settings.is_header_open.state &&
          "translate-y-1/1 opacity-0 pointer-events-none select-none",
        "transition duration-400",
        // "mask-x-from-90% mask-x-to-100%",
        "overflow-x-auto overflow-y-hidden custom-scrollbar flex z-20"
      )}
    >
      {children}
    </section>
  );
}
