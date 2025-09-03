"use client";
import clsx from "clsx";
import { deleteComment } from "../../../../../lib/data";
import { useState } from "react";
import { setIDCookies } from "../../../../../lib/set_cookie";

export default function DeleteButton({
  chapter,
  uuid,
}: {
  chapter: string;
  uuid: string;
}) {
  const [is_open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className={clsx(
          "cursor-pointer select-none text-center flex flex-col w-[42px] h-[calc-size(auto,size)] flex-none"
        )}
      >
        <div className="relative rounded-t-[4px] z-0 group border-b-[1.5px] border-black flex-auto flex bg-amber-400/90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon/edit.svg"
            alt="edit_comment"
            className="h-[25px] aspect-square m-auto"
          />
          <div
            className={clsx(
              "text-s absolute top-0 -translate-x-1/3 pointer-events-none rounded-[10px] px-[20px] py-[2px] bg-white border-2 leading-[1em]",
              "transition duration-200 text-black",
              "group-hover:opacity-100 group-hover:delay-300 opacity-0"
            )}
          >
            Under Development
          </div>
        </div>
        <div
          onClick={() => setOpen(true)}
          className="flex-auto rounded-b-[4px] flex border-t-[1.5px] border-black bg-red-500/70 hover:bg-red-600/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon/delete.svg"
            alt="delete_comment"
            className="h-[25px] aspect-square m-auto"
          />
        </div>
      </button>

      <div
        className={clsx(
          is_open ? "bg-black/40" : "bg-transparent pointer-events-none",
          "transition-all duration-200",
          "absolute top-0 left-0 w-full h-full flex z-20"
        )}
      >
        <div
          className={clsx(
            "m-auto flex flex-col justify-around rounded-[10px] -translate-y-1/2 w-[60vw] sm:w-[min(40vw,400px)] aspect-[2/1] bg-gray-100 text-black text-m font-semibold",
            is_open ? "scale-100" : "scale-0",
            "transition-all duration-200"
          )}
        >
          <h3 className="text-l mx-auto mt-[5%]">Are you Sure?</h3>
          <div
            className={clsx(
              "flex mb-[10%] justify-around px-[8%]",
              "[&_button]:cursor-pointer [&_button]:border-1 [&_button]:rounded-[0.5em] [&_button]:px-[1.5em] [&_button]:py-[0.5em]"
            )}
          >
            <button
              onClick={async () => {
                await deleteComment(chapter, uuid);
                setIDCookies("self_comment_id_list", uuid, false);
                setOpen(false);
              }}
              className="bg-[#d32323]"
            >
              Delete
            </button>
            <button onClick={() => setOpen(false)} className="bg-[#9b9b9a]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
