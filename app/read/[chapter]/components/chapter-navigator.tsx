"use client";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { ChaptersList } from "../../../lib/chapters";
import { main_font } from "../../../fonts";
import Link from "next/link";

export default function ChapterNavigator({
  chapter_list_data,
  chapter_index,
}: {
  chapter_list_data: ChaptersList[];
  chapter_index: number;
}) {
  const chapters_ref = useRef<HTMLDivElement>(null);
  const [is_open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!is_open) return;

    const book_element = document.getElementById("book_section");
    const handleClick = (e: MouseEvent) => {
      if (book_element && book_element.contains(e.target as HTMLElement))
        setOpen(false);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [is_open]);

  useEffect(() => {
    const target_element = document.getElementById(
      `chapter_navigator_${chapter_index}`
    );
    if (chapters_ref.current && target_element)
      chapters_ref.current.scrollTop = target_element.offsetTop - 150;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside
      className={clsx(
        "pr-[5em] absolute top-0 left-[calc(50%-min(50%,700px))] z-10 bg-black/90 pointer-events-none",
        "mask-r-from-70% mask-r-to-100% pl-[1em]",
        "lg:mask-x-from-70% lg:mask-x-to-100% lg:pl-[5em]",
        is_open
          ? "mask-b-from-80% mask-b-to-100%"
          : "mask-b-from-40% mask-b-to-100% pb-[2em]",
        "transition-all duration-100",
        `${main_font.className} xl:text-[1.1em] text-[0.95em] font-medium text-gray-300`
      )}
    >
      <div
        onClick={() => setOpen(!is_open)}
        className="w-full pl-[2em] py-[0.75em] select-none cursor-pointer pointer-events-auto flex"
      >
        <p className="pr-[1em]">{`# Chapter ${chapter_list_data[chapter_index].chapter}`}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon/arrow_back_white.svg"
          alt="open/close_arrow"
          className={clsx(
            "h-[1.4em] aspect-square scale-[90%]",
            is_open ? "rotate-0" : "-rotate-90",
            "transition duration-200"
          )}
        />
      </div>
      <div
        ref={chapters_ref}
        className={clsx(
          "w-[20em] overflow-y-scroll custom-scrollbar left-scrollbar text-left",
          is_open ? "h-[90vh]" : "h-0",
          "transition-all duration-300"
        )}
      >
        {chapter_list_data.map((chapter_data: ChaptersList, i: number) => (
          <Link href={`/read/chapter-${chapter_data.chapter}`} key={i}>
            <div
              id={`chapter_navigator_${i}`}
              className={clsx(
                chapter_data.chapter ===
                  chapter_list_data[chapter_index].chapter && "bg-gray-800",
                "px-[1em] py-[0.5em] border-y-[1px]",
                "border-gray-700 cursor-pointer pointer-events-auto"
              )}
            >{`Chapter ${chapter_data.chapter} - ${chapter_data.title}`}</div>
          </Link>
        ))}
        <div className="h-[12em]" />
      </div>
    </aside>
  );
}
