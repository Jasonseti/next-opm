"use client";
import clsx from "clsx";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ContextType, SettingsContext } from "../../state_provider";
import { useContext } from "react";

export default function GoTo({ page_number }: { page_number: number }) {
  const settings: ContextType = useContext(SettingsContext);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <div
      onClick={() => {
        const book_element = document.getElementById("scroll_reader");
        const id =
          settings.page_mode.state.toLowerCase() === "two-page"
            ? `${settings.read_mode.state}_${settings.page_mode.state}_page_${page_number}`
            : `${settings.read_mode.state}_page_${page_number}`;
        const target_element = document.getElementById(id);

        if (book_element && target_element)
          book_element.scrollTo({
            top: target_element.offsetTop - 50,
            behavior: "smooth",
          });

        settings.current_page.setState(page_number);
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page_number + 1));
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }}
      className={clsx(
        "absolute w-full h-full cursor-pointer select-none bg-black/0",
        settings.current_page.state === page_number && "bg-black/40",
        "transition-all duration-100"
      )}
    ></div>
  );
}
