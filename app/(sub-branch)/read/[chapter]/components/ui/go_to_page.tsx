"use client";
import { ContextType, SettingsContext } from "../../state_provider";
import { useContext } from "react";

export default function GoTo({ page_number }: { page_number: number }) {
  const settings: ContextType = useContext(SettingsContext);

  return (
    <div
      onClick={() => {
        const book_element = document.getElementById("scroll_reader");
        const id =
          settings.page_mode.state.toLowerCase() === "two-page"
            ? `${settings.read_mode.state}_${settings.page_mode.state}_page_${settings.current_page.state}`
            : `${settings.read_mode.state}_page_${page_number}`;
        const target_element = document.getElementById(id);

        // settings.current_page.setState(page_number);
        if (book_element && target_element)
          book_element.scrollTo({
            top: target_element.offsetTop - 50,
            behavior: "smooth",
          });
      }}
      className="absolute w-full h-full cursor-pointer opacity-0 select-none"
    ></div>
  );
}
