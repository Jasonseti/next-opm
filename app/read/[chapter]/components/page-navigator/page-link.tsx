"use client";
import clsx from "clsx";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { StatesTypes, StatesContext } from "../../state-provider";

import { useContext } from "react";

export default function PageLink({ page_number }: { page_number: number }) {
  const states: StatesTypes = useContext(StatesContext);
  const read_mode: string = states.read_mode.state.toLowerCase();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <div
      onClick={() => {
        if (read_mode === "scroll") {
          const book_element = document.getElementById("scroll_wrapper");
          const id = `${states.read_mode.state}_${states.page_mode.state}_page_${page_number}`;
          const target_element = document.getElementById(id);

          if (book_element && target_element)
            book_element.scrollTo({
              top: target_element.offsetTop - 50,
              behavior: "smooth",
            });
        }

        states.current_page.setState(page_number);
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page_number));
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }}
      className={clsx(
        "absolute w-full h-full top-0 cursor-pointer select-none bg-black/0",
        states.current_page.state === page_number && "bg-black/40",
        "transition-all duration-100"
      )}
    ></div>
  );
}
