"use client";
import clsx from "clsx";
import { useContext } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ContextType, SettingsContext } from "../../state_provider";
import { main_font } from "../../../../../fonts";

export default function CommentDrawer({
  children,
  comments_length,
}: {
  children: React.ReactNode;
  comments_length: number;
}) {
  const settings: ContextType = useContext(SettingsContext);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div
        className={clsx(
          "fixed left-[calc(50%-min(45%,600px))]",
          settings.is_header_open.state
            ? "sm:bottom-[calc(8%+min(27vw,300px))] bottom-[5%]"
            : "bottom-[5%]",
          "transition-all duration-400 ease-in-out select-none"
        )}
      >
        <button
          className={clsx(
            "cursor-pointer rounded-[10px] outline-[2px] p-[8px]",
            "bg-gray-100 hover:bg-gray-300 active:bg-gray-400",
            "transition-all duration-75 relative"
          )}
          onClick={() => {
            settings.is_comment_open.setState(true);
            const params = new URLSearchParams(searchParams);
            params.set("comment", "open");
            replace(`${pathname}?${params.toString()}`, { scroll: false });
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-[40px] h-[40px]"
            src="/icon/comment.svg"
            alt="comment_button"
          />
          <div className="absolute top-0 right-0 rounded-[100px] px-[10px] border-[1.5px] bg-amber-400 translate-x-1/3 -translate-y-1/3">
            <p className="leading-[1.25em] pb-[0.1em] text-[1em] font-medium">
              {comments_length}
            </p>
          </div>
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
            onClick={() => {
              settings.is_comment_open.setState(false);
              const params = new URLSearchParams(searchParams);
              params.delete("comment");
              replace(`${pathname}?${params.toString()}`, { scroll: false });
            }}
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
