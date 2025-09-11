"use client";
import clsx from "clsx";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";

export function HeaderDrawer({ children }: { children: React.ReactNode }) {
  const states: StatesTypes = useContext(StatesContext);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const book_element = document.getElementById("book_section");
      const reception_page = document.getElementById("reception_page");
      if (
        reception_page &&
        reception_page.contains(event.target as HTMLElement)
      )
        return;
      if (book_element && book_element.contains(event.target as HTMLElement)) {
        states.is_header_open.setState(!states.is_header_open.state);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.is_header_open.state]);

  return (
    <section
      className={clsx(
        "flex",
        "absolute w-[min(90vw,1000px)] aspect-[3/1] inset-0 mx-auto z-20",
        "shadow-[12px_12px_25px_0px_rgba(0,_0,_0,_0.5)]",
        "bg-[var(--background)] rounded-b-[10px]",
        !states.is_header_open.state && "-translate-y-1/1",
        "transition duration-400 ease-in-out"
      )}
    >
      {children}
      <figure className="h-[20%] aspect-square absolute bottom-[3%] left-[59%] -translate-x-1/1 cursor-help">
        <Image
          fill
          style={{ objectFit: "contain" }}
          src="/sticker/moon_sticker.png"
          alt="saitama on moon"
        ></Image>
      </figure>
    </section>
  );
}

// export function MobileDrawer({ children }: { children: React.ReactNode }) {
//   const settings: ContextType = useContext(SettingsContext);

//   return (
//     <div
//       className={clsx(
//         "absolute z-20 top-[5%]",
//         !settings.is_header_open.state && "-translate-x-1/1",
//         "transition duration-500 ease-in-out"
//       )}
//     >
//       {children}
//     </div>
//   );
// }
