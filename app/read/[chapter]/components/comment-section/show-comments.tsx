/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useRef, useState, useEffect, useContext } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";
import LikeButton from "./like-button";
import { commentTypes } from "./comment-section";
import { EditComment } from "../../../../lib/comments";
import { deleteComment } from "../../../../lib/comments";
import { setIDCookies } from "../../../../lib/cookies";

export default function ShowComments({
  props,
  self_comment,
}: {
  props: commentTypes;
  self_comment: boolean;
}) {
  const states: StatesTypes = useContext(StatesContext);
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  const delete_modal_ref = useRef<HTMLDivElement>(null);
  const [is_edit, setEdit] = useState<boolean>(false);
  const [is_delete, setDelete] = useState<boolean>(false);

  useEffect(() => {
    const modal = delete_modal_ref.current;
    if (!modal) return;

    const handleClick = (e: MouseEvent) => {
      if (!modal.children[0].contains(e.target as HTMLElement))
        setDelete(false);
    };

    modal.addEventListener("click", handleClick);
    return () => modal.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className={clsx(
        "w-[95%] mx-auto flex px-[2vw] py-[0.5em] my-[0.6em]",
        "bg-gray-800 border-1 border-gray-500 rounded-bl-[10px]",
        "rounded-br-[15px] rounded-tl-[15px] rounded-tr-[10px]"
      )}
    >
      <div className="flex-auto text-[0.9em] relative">
        <div className="flex mb-[0.4em] text-gray-400">
          <p>{props.username}</p>
          <div className="w-[1.5em] text-center">-</div>
          <p>
            {new Date(props.date).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        {is_edit ? (
          <>
            <textarea
              ref={textarea_ref}
              className={clsx(
                "w-[calc(100%-1em)] flex-auto resize-none p-[0.2em] rounded-[min(0.5vw,5px)]",
                "outline-[1.5px] focus:outline-[2px] outline-gray-400",
                "overflow-hidden text-wrap no-scrolbar text-[1.1em]"
              )}
              autoFocus={is_edit}
              onFocus={(e) => {
                const length = e.target.value.length;
                e.target.setSelectionRange(length, length);
              }}
              defaultValue={props.comment}
            />
            <button
              onClick={async () => {
                await EditComment(
                  states.chapter,
                  props._id,
                  textarea_ref.current?.value || ""
                );
                setEdit(false);
              }}
              className={clsx(
                "absolute bottom-[0.75em] right-[1.5em] cursor-pointer",
                "px-[1em] py-[0.1em] rounded-[1em]",
                "bg-[var(--primary-yellow)] font-semibold text-black"
              )}
            >
              Save
            </button>
          </>
        ) : (
          <p className="w-[calc(100%-1em)] overflow-hidden text-wrap no-scrolbar text-[1.1em]">
            {props.comment}
          </p>
        )}
      </div>
      {self_comment && (
        <div
          className={clsx(
            "select-none text-center flex-none",
            "flex flex-col w-[42px] h-[calc-size(auto,size)]"
          )}
        >
          <button
            onClick={() => setEdit(!is_edit)}
            className={clsx(
              "flex-auto flex bg-[var(--primary-yellow)] hover:bg-[var(--primary-yellow)]/80",
              "rounded-t-[4px] border-b-[1.5px] border-black cursor-pointer"
            )}
          >
            <img
              src="/icon/edit.svg"
              alt="edit_comment"
              className="h-[25px] aspect-square m-auto"
            />
          </button>
          <button
            onClick={() => setDelete(true)}
            className={clsx(
              "flex-auto flex bg-[var(--primary-red)]/90 hover:bg-[var(--primary-red)]/70",
              "rounded-b-[4px] border-t-[1.5px] border-black cursor-pointer"
            )}
          >
            <img
              src="/icon/delete.svg"
              alt="delete_comment"
              className="h-[25px] aspect-square m-auto"
            />
          </button>
        </div>
      )}
      <LikeButton _id={props._id} likes={props.like} />

      <div
        ref={delete_modal_ref}
        className={clsx(
          is_delete
            ? "bg-black/40 pointer-events-auto"
            : "bg-transparent pointer-events-none",
          "transition-all duration-150",
          "absolute top-0 left-0 w-full h-full flex z-20 text-[3vw] sm:text-[2vw] lg:text-[min(1.2vw,1.2em)]"
        )}
      >
        <div
          className={clsx(
            "m-auto rounded-[min(1vw,10px)]",
            "-translate-y-1/2 w-[60vw] sm:w-[min(40vw,400px)]",
            "bg-gray-100 text-black text-m font-semibold",
            is_delete ? "scale-100" : "scale-0",
            "transition-all duration-150"
          )}
        >
          <h3 className="text-center mx-auto my-[5%]">Delete This Comment?</h3>
          <div
            className={clsx(
              "flex mb-[10%] justify-around px-[8%]",
              "[&_button]:cursor-pointer [&_button]:border-1 [&_button]:rounded-[0.5em]",
              "[&_button]:px-[1.5em] [&_button]:py-[0.5em]"
            )}
          >
            <button
              onClick={async () => {
                await deleteComment(states.chapter, props._id);
                setIDCookies("self_comment_id_list", props._id, false);
                setDelete(false);
              }}
              className="bg-[var(--primary-red)]"
            >
              Delete
            </button>
            <button onClick={() => setDelete(false)} className="bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
