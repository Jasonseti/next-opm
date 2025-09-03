"use client";
import { main_font } from "../../../fonts";
import clsx from "clsx";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useContext, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ContextType, ThemeContext } from "../../../theme_provider";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState<string>("");
  const theme_context: ContextType = useContext(ThemeContext);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 100);

  return (
    <input
      className={clsx(
        theme_context.theme === "light" ? "border-gray-800" : "border-gray-300",
        "bg-[var(--background)] m-auto border-[1.5px] focus:border-[1.8px] rounded-[10px] w-full h-[max(min(4.8vw,42px),35px)] pl-[3em] pr-[1em]",
        `${main_font.className} peer text-m text-black font-medium relative leading-[100px]`
      )}
      spellCheck="false"
      type="text"
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      onChange={(e) => {
        let value = e.target.value.replace("Chapter ", "");
        value = value ? (!isNaN(Number(value)) ? "Chapter " : "") + value : "";
        setValue(value);
        handleSearch(value.replace("Chapter ", ""));
      }}
      value={value}
      defaultValue={searchParams.get("query")?.toString()}
      placeholder="Search by number, title, or description . . ."
    />
  );
}
