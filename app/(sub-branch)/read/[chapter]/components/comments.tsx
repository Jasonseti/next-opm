import clsx from "clsx";
import LikeButton from "./ui/like_button";
import CommentDrawer from "./ui/comment_drawer";

export default function CommentSection({ comments }: { comments: string[] }) {
  return (
    <CommentDrawer>
      <main className="relative mt-[25px] w-[min(90%,1100px)] h-[180px] lg:h-[200px] flex-none mx-auto flex flex-col">
        <h3 className="text-l text-gray-200 z-20">Leave a Comment!</h3>
        <hr className="w-[102%] -translate-x-[1%] border-[2px] border-gray-200 rounded-[100px]" />
        <div className="w-[95%] mx-auto mt-[10px] flex flex-auto">
          <div className="w-[max(20%,150px)] text-m flex-none mr-[2vw] flex flex-col justify-around">
            <div className="flex-none">
              <label className="text-gray-200" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="text-gray-200 font-medium bg-gray-800 w-full px-[8px] py-[2px] rounded-[5px] outline-[1px] focus:outline-[1.5px] outline-gray-400"
                placeholder="(Anonymous)"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div className="border-1 border-gray-200 w-full mx-auto aspect-[4/1]"></div>
          </div>
          <div className="relative w-[100%] text-m lg:w-[min(100%,700px)] h-full">
            <textarea
              className="text-gray-200 py-[10px] px-[16px] font-semibold bg-gray-800 w-[100%] h-[100%] rounded-[8px] resize-none outline-[1px] focus:outline-[1.5px] outline-gray-400"
              name="comment_input"
            />
            <button
              className={clsx(
                "absolute bottom-[5px] right-[5px] bg-amber-500 hover:bg-amber-600 rounded-[5px] cursor-pointer select-none",
                "text-[min(1em,25px)] font-semibold px-[2em] py-[0.2em]"
                // "hover:outline-black outline-[1.5px] outline-black/0 transition-all duration-200"
              )}
            >
              Post
            </button>
          </div>
        </div>
      </main>

      <main className="w-[min(90%,1100px)] mt-[15px] h-[65%] flex-auto mx-auto flex flex-col">
        <div className="text-l">
          <h2 className="text-[1.2em] text-gray-200">Top Comments</h2>
          <hr className="w-[102%] -translate-x-[1%] border-[2px] border-gray-200 rounded-[100px]" />
        </div>
        <div
          className={clsx(
            "flex-auto overflow-y-scroll overflow-x-hidden no-scrollbar",
            ""
          )}
        >
          {comments.length > 0 ? (
            Array.from(Array(24)).map((_, i) => (
              <div
                key={i}
                className="flex text-gray-200 px-[2vw] pt-[8px] pb-[10px] ml-[1.5vw] w-[95%] bg-gray-800 border-1 border-gray-500 my-[10px] rounded-[10px]"
              >
                <div className="w-full">
                  <div className="flex mb-[6px] text-[0.9em] text-gray-400">
                    <p>ricebowlKenj1</p>
                    <div className="w-[20px] text-center">-</div>
                    <p>Apr 05, 2025</p>
                  </div>
                  <div className="px-[2vw]">{"10 / 10 will recommend"}</div>
                </div>
                <LikeButton likes={78} />
              </div>
            ))
          ) : (
            <div></div>
          )}
          <div className="flex h-[100px] text-m text-gray-200">
            <p className="m-auto -translate-y-1/2">
              {comments.length > 0
                ? "- End of Comment -"
                : "- No Comments Yet -"}
            </p>
          </div>
        </div>
      </main>
    </CommentDrawer>
  );
}
