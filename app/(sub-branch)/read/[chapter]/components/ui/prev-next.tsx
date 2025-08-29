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
    <div className="text-m w-[min(100%,1000px)] px-[1em] text-center text-white flex justify-between">
      <div
        className={
          chapter_index === 0 ? "opacity-0 pointer-events-none select-none" : ""
        }
      >
        <button
          onClick={() =>
            router.push("/read/chapter-" + chapter_array[chapter_index - 1])
          }
          className="prev-next-button font-semibold"
        >
          Prev Chapter
        </button>
        <p>{`Chapter ${chapter_array[chapter_index - 1]}`}</p>
      </div>

      <div
        className={
          chapter_index === chapter_array.length - 1
            ? "opacity-0 pointer-events-none select-none"
            : ""
        }
      >
        <button
          onClick={() =>
            router.push("/read/chapter-" + chapter_array[chapter_index + 1])
          }
          className="prev-next-button font-semibold"
        >
          Next Chapter
        </button>
        <p>{`Chapter ${chapter_array[chapter_index + 1]}`}</p>
      </div>
    </div>
  );
}
