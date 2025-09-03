"use client";
import clsx from "clsx";
import { useState, useRef } from "react";
import { likeComment } from "../../../../../lib/data";
import { setIDCookies } from "../../../../../lib/set_cookie";

export default function LikeButton({
  chapter,
  uuid,
  likes,
  liked,
}: {
  chapter: string;
  uuid: string;
  likes: number;
  liked: boolean;
}) {
  const current_likes = useRef<number>(liked ? likes - 1 : likes);
  const [is_liked, setLiked] = useState<boolean>(liked);

  return (
    <button
      onClick={async () => {
        await likeComment(chapter, uuid, !is_liked);
        setIDCookies("liked_id_list", uuid, !is_liked);
        setLiked(!is_liked);
      }}
      className={clsx(
        "cursor-pointer select-none text-center flex flex-col w-[50px] h-[calc-size(auto,size)] flex-none",
        is_liked && "text-orange-300"
      )}
    >
      <p>Like</p>
      <div className="flex-auto flex">
        <svg
          className={clsx(
            is_liked ? "fill-orange-300" : "fill-gray-200",
            "m-auto"
          )}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="m713-280 127-297v-23H588l19-134-55 55q-8-8-28-28.5T496-736l144-144 32 32q14 14 19.5 31.5T694-780l-14 100h160q33 0 56.5 23.5T920-600v23q0 8-1.5 16t-4.5 16l-93 216q-10 22-30 35.5T747-280h-34ZM240-120H40v-400h200v80H120v240h120v80Zm267 0H160v-360l240-240 32 32q14 14 19.5 31.5T454-620l-14 100h160q33 0 56.5 23.5T680-440v24q0 8-1.5 15.5T674-385l-93 217q-10 22-30 35t-44 13Zm0-80 93-216v-24H348l19-134-127 127v247h267Zm-267 0v-247 247Z" />
        </svg>
      </div>
      <p>{`{ ${
        is_liked ? current_likes.current + 1 : current_likes.current
      } }`}</p>
    </button>
  );
}
