"use client";
import { useRouter } from "next/navigation";
import { chapter_array } from "../../../../../variables";

export default function PrevNext({
  current_chapter,
}: {
  current_chapter: string;
}) {
  const router = useRouter();
  const chapter_index = chapter_array.findIndex(
    (chapter) => chapter === current_chapter
  );

  return (
    <div className="text-[max(min(2.1vw,1.2em),1em)] sm:text-[max(min(1.6vw,0.9em),0.7em)] font-semibold flex [&_button]:cursor-pointer [&_button]:w-[min(50%,120px)] [&_button]:text-center [&_button]:border-[1.5px] [&_button]:rounded-[5px] [&_button]:px-[0px] [&_button]:py-[1px]">
      <button
        className="flex mr-[5px]"
        style={{ display: chapter_index === 0 ? "none" : "flex" }}
        onClick={() =>
          router.push("/read/chapter-" + chapter_array[chapter_index - 1])
        }
      >
        <div className="m-auto flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-[max(min(2.4vw,1.3em),1em)] rotate-180"
            src="/icon/next_page.svg"
            alt="next_page"
          />
          {chapter_index !== 0 && "Chapter " + chapter_array[chapter_index - 1]}
        </div>
      </button>
      <button
        className="flex"
        style={{
          display: chapter_index === chapter_array.length - 1 ? "none" : "flex",
        }}
        onClick={() =>
          router.push("/read/chapter-" + chapter_array[chapter_index + 1])
        }
      >
        <div className="flex m-auto">
          {chapter_index !== chapter_array.length - 1 &&
            "Chapter " + chapter_array[chapter_index + 1]}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-[max(min(2.4vw,1.3em),1em)]"
            src="/icon/next_page.svg"
            alt="next_page"
          />
        </div>
      </button>
    </div>
  );
}
