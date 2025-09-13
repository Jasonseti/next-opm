"use client";
import clsx from "clsx";
import { useState, useContext } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { StatesTypes, StatesContext } from "../../state-provider";
import Image from "next/image";
import { setIDCookies } from "../../../../lib/cookies";
import { incrementFavorite } from "../../../../lib/chapters";

export function UtilityIcons({
  chapter,
  favorited,
  bookmarked,
}: {
  chapter: string;
  favorited?: boolean;
  bookmarked?: boolean;
}) {
  const states: StatesTypes = useContext(StatesContext);
  const [messages, setMessages] = [
    states.messages.state,
    states.messages.setState,
  ];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [is_bookmarked, setBookmarked] = useState<boolean>(bookmarked || false);
  const [is_favorited, setFavorited] = useState<boolean>(favorited || false);

  return (
    <div className="h-[15%] flex [&_div]:mx-[0.25em] select-none">
      <Icon
        onClick={async () => {
          setBookmarked(!is_bookmarked);
          await setIDCookies("bookmarked_list", chapter, !is_bookmarked);
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
          states.is_comment_open.setState(true);
          const params = new URLSearchParams(searchParams);
          params.set("comment", "open");
          replace(`${pathname}?${params.toString()}`, { scroll: false });
        }}
        name={"comment"}
      />
      <Icon
        onClick={async () => {
          setFavorited(!is_favorited);
          await incrementFavorite(chapter, !is_favorited);
          setIDCookies("favorited_list", chapter, !is_favorited);
          setMessages([
            ...messages,
            !is_favorited
              ? `Chapter ${chapter} is added to Favorite!`
              : `Chapter ${chapter} is removed from Favorite!`,
          ]);
        }}
        name={is_favorited ? "heart_filled" : "heart"}
      />
      <Icon
        onClick={() => states.is_feedback_open.setState(true)}
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
      className="h-[20%] relative border-[2px] rounded-[min(2vw,20px)] border-gray-800 cursor-pointer select-none"
    >
      <Image
        fill
        src="/common_image/home_logo.png"
        alt="home_logo"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

function Icon({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative h-full aspect-square flex cursor-pointer",
        "rounded-[min(1vw,10px)] bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
      )}
    >
      <Image
        fill
        src={`/icon/${name}.svg`}
        alt={`${name}_icon`}
        className="scale-[75%]"
      ></Image>
    </div>
  );
}
