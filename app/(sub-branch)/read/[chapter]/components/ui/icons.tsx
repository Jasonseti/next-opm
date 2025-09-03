"use client";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { ContextType, SettingsContext } from "../../state_provider";
import { useState } from "react";
import { setChapterCookies } from "../../../../../lib/set_cookie";
import { addFavorite } from "../../../../../lib/data";

function Icon({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="h-full p-[1px] flex aspect-square cursor-pointer rounded-[8px] bg-gray-300 hover:bg-gray-400 active:bg-gray-500;"
    >
      <div className="relative w-full h-full">
        <Image fill src={`/icon/${name}.svg`} alt={`${name}_icon`}></Image>
      </div>
    </div>
  );
}

export function Utility_Icons({
  chapter,
  favorited,
  bookmarked,
}: {
  chapter: string;
  favorited?: boolean;
  bookmarked?: boolean;
}) {
  const settings: ContextType = useContext(SettingsContext);
  const [messages, setMessages] = [
    settings.messages.state,
    settings.messages.setState,
  ];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [is_bookmarked, setBookmarked] = useState<boolean>(bookmarked || false);
  const [is_favorite, setFavorite] = useState<boolean>(favorited || false);
  return (
    <div className="h-[37px] flex [&_div]:mx-[4px] -ml-[4px] select-none">
      <Icon
        onClick={async () => {
          setBookmarked(!is_bookmarked);
          await setChapterCookies("bookmark_list", chapter, !is_bookmarked);
          setMessages([
            ...messages,
            !is_bookmarked
              ? `Chapter ${chapter} is added to Bookmark!`
              : `Chapter ${chapter} is removed from Bookmark!`,
          ]);
        }}
        name={is_bookmarked ? "bookmark_filled" : "bookmark"}
      />
      <Icon
        onClick={() => {
          settings.is_comment_open.setState(true);
          const params = new URLSearchParams(searchParams);
          params.set("comment", "open");
          replace(`${pathname}?${params.toString()}`, { scroll: false });
        }}
        name={"comment"}
      />
      <Icon
        onClick={async () => {
          setFavorite(!is_favorite);
          setChapterCookies("favorite_list", chapter, !is_favorite);
          await addFavorite(chapter, !is_favorite);
          setMessages([
            ...messages,
            !is_favorite
              ? `Chapter ${chapter} is added to Favorite!`
              : `Chapter ${chapter} is removed from Favorite!`,
          ]);
        }}
        name={is_favorite ? "heart_filled" : "heart"}
      />
      {/* <div onClick={() => setFavorite(!is_favorite)} className="icons">
        <Image
          fill
          src={`/icon/heart_${is_favorite ? "full.png" : "hollow.svg"}`}
          alt="favorite icon"
          className={clsx(is_favorite ? "p-[6px]" : "p-[4px]")}
        ></Image>
      </div> */}
      <Icon
        onClick={() => settings.is_report_open.setState(true)}
        name={"feedback"}
      />
    </div>
  );
}

export function HomeLogo() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="h-[30%] inline-block border-gray-800 sm:h-[25%] cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-full"
        src="/common_image/home_logo.png"
        alt="home_logo"
        // style={{ objectFit: "cover" }}
      />
    </div>
  );
}
