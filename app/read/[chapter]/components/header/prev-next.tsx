/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { StatesTypes, StatesContext } from "../../state-provider";

export default function PrevNext() {
  const router = useRouter();
  const states: StatesTypes = useContext(StatesContext);
  const chapter_index = states.chapter_list.findIndex(
    (chapter: string) => chapter === states.chapter
  );

  return (
    <div className="flex text-center text-[0.9em]">
      <button
        onClick={() =>
          router.push("/read/chapter-" + states.chapter_list[chapter_index - 1])
        }
        className={clsx(
          chapter_index === 0
            ? "opacity-0 pointer-events-none select-none w-0"
            : "mr-[1em]",
          "bg-gray-300 cursor-pointer flex",
          "rounded-[min(1vw,5px)] border-[1.5px]"
        )}
      >
        <img
          src="/icon/double_arrow.svg"
          alt="prev_chapter_arrow"
          className="w-[1.45em] h-[1.45em]"
        />
        {`${
          states.chapter_list[chapter_index - 1]?.length < 5 ? "Chapter" : ""
        } ${states.chapter_list[chapter_index - 1]}`}
        <div className="w-[0.4em]" />
      </button>

      <button
        onClick={() =>
          router.push("/read/chapter-" + states.chapter_list[chapter_index + 1])
        }
        className={clsx(
          chapter_index === states.chapter_list.length - 1 &&
            "opacity-0 pointer-events-none select-none",
          "bg-gray-300 cursor-pointer flex",
          "rounded-[min(1vw,5px)] border-[1.5px]"
        )}
      >
        <div className="w-[0.4em]" />
        {`${
          states.chapter_list[chapter_index + 1]?.length < 5 ? "Chapter" : ""
        } ${states.chapter_list[chapter_index + 1]}`}{" "}
        <img
          src="/icon/double_arrow.svg"
          alt="next_chapter_arrow"
          className="rotate-180 w-[1.45em] h-[1.45em]"
        />
      </button>
    </div>
  );
}
