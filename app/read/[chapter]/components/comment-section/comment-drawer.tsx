"use client";
import clsx from "clsx";
import { useContext } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { StatesTypes, StatesContext } from "../../state-provider";
import Image from "next/image";
import { main_font } from "../../../../fonts";

export default function CommentDrawer({
  children,
  comments_length,
}: {
  children: React.ReactNode;
  comments_length: number;
}) {
  const states: StatesTypes = useContext(StatesContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <section
        id="comment_section"
        className={clsx(
          "fixed bottom-0 z-20 w-full h-[600px] sm:h-[min(100vh,700px)]",
          "bg-gray-700/85 flex flex-col overflow-x-hidden",
          !states.is_comment_open.state && "translate-y-1/1",
          "transition duration-400 ease-in-out",
          `${main_font.className} text-[1em] text-gray-200`
        )}
      >
        <button
          onClick={() => {
            states.is_comment_open.setState(false);
            const params = new URLSearchParams(searchParams);
            params.delete("comment");
            router.replace(`${pathname}?${params.toString()}`, {
              scroll: false,
            });
          }}
          className={clsx(
            "absolute right-[2vw] top-[max(1vw,10px)]",
            "hover:scale-[110%] transition duration-200",
            "h-[8vw] sm:h-[min(5vw,50px)] aspect-square rounded-[25%] bg-black cursor-pointer float-right mr-[2vw] z-10 select-none"
          )}
        >
          <Image fill src="/icon/close.svg" alt="close_button" />
        </button>

        {children}
      </section>

      <OpenButton comments_length={comments_length} />
    </>
  );
}

function OpenButton({ comments_length }: { comments_length: number }) {
  const states: StatesTypes = useContext(StatesContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "fixed left-[calc(50%-min(45%,650px))]",
        states.is_header_open.state
          ? "sm:bottom-[calc(7%+90vw*1/3)] xl:bottom-[calc(7%+min(80vw,1400px)*1/4)] bottom-[5%]"
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
          states.is_comment_open.setState(true);
          const params = new URLSearchParams(searchParams);
          params.set("comment", "open");
          router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
          });
        }}
      >
        <Image
          width={40}
          height={40}
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
  );
}
