"use client";
import clsx from "clsx";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { main_font } from "../../../fonts";

export default function SearchInput() {
  const [searchParams, pathname, router] = [
    useSearchParams(),
    usePathname(),
    useRouter(),
  ];
  const addChapter = (value: string) =>
    (value = value ? (!isNaN(Number(value)) ? "Chapter " : "") + value : "");
  const [value, setValue] = useState<string>(
    addChapter(searchParams.get("query")?.toString() || "")
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 100);

  return (
    <input
      className={clsx(
        "w-full h-full border-[1.5px] pl-[3em] pr-[1em] focus:border-[2px] rounded-[8px]",
        `${main_font.className} font-medium bg-gray-100 text-black`
      )}
      onChange={(e) => {
        const value = e.target.value.replace("Chapter ", "");
        setValue(addChapter(value));
        handleSearch(value);
      }}
      spellCheck="false"
      value={value}
      placeholder="Search by number, title, or description . . ."
    />
  );
}
