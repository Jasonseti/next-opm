"use client";
import clsx from "clsx";
import { useContext } from "react";
import { ContextType, SettingsContext } from "../../state_provider";
import { main_font } from "../../../../../fonts";

export default function CommentDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings: ContextType = useContext(SettingsContext);

  return (
    <>
      <div
        className={clsx(
          "fixed left-[calc(50%-min(45%,600px))] w-[min(90%,1200px)]",
          settings.is_header_open.state
            ? "bottom-[calc(8%+min(27vw,300px))]"
            : "bottom-[5%]",
          "transition-all duration-400 ease-in-out"
        )}
      >
        <button
          className={clsx(
            "cursor-pointer rounded-[10px] outline-[2px] p-[8px]",
            "bg-gray-200 hover:bg-gray-300 active:bg-gray-400",
            "transition-all duration-75"
          )}
          onClick={() => settings.is_comment_open.setState(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-[40px] h-[40px]"
            src="/icon/comment.svg"
            alt="comment_button"
          />
        </button>
      </div>

      <section
        id="comment_section"
        className={clsx(
          "fixed z-20 bottom-0 w-full bg-gray-700 h-[85vh] flex flex-col overflow-hidden",
          !settings.is_comment_open.state && "translate-y-1/1",
          "transition duration-400 ease-in-out",
          `${main_font.className}`
        )}
      >
        <div
          className={clsx(
            "absolute top-0 right-[2vw] mt-[max(1vw,10px)] flex-none z-50",
            "hover:scale-[110%] transition duration-200"
          )}
        >
          <button
            onClick={() => settings.is_comment_open.setState(false)}
            className="p-[5px] rounded-[25%] bg-black/50 cursor-pointer float-right mr-[2vw] z-10 select-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon/close.svg"
              alt="close_button"
              className="h-[30px] sm:h-[40px]"
            />
          </button>
        </div>

        {children}
      </section>
    </>
  );
}
