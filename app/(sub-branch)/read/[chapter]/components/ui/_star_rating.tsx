"use client";
import clsx from "clsx";
import { useState, useEffect, useRef, useContext } from "react";
import { setChapterCookies } from "../../../../../lib/set_cookie";
import { ContextType, SettingsContext } from "../../state_provider";

export default function StarRating({
  chapter,
  chapter_rating,
  rating_count = 10,
  user_rating,
}: {
  chapter: string;
  chapter_rating: number;
  rating_count?: number;
  user_rating?: number;
}) {
  const settings: ContextType = useContext(SettingsContext);
  const [rating, setRating] = useState<number>(chapter_rating);
  const [star_counter, setStarCounter] = useState<number>(
    user_rating || chapter_rating
  );
  const ratingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStarCounter(user_rating || chapter_rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_rating]);

  useEffect(() => {
    const rater = ratingRef.current;
    const rater_width = rater ? rater.clientWidth : 0;
    const handleHover = (event: MouseEvent) => {
      setStarCounter(Math.ceil((event.layerX / rater_width) * 10) / 2);
    };
    const handleLeave = () => {
      setStarCounter(user_rating || chapter_rating);
    };
    const handleClick = () => {
      setRating(star_counter);
      setChapterCookies("rating_list", chapter, star_counter);
      settings.messages.setState([
        ...settings.messages.state,
        `Your Vote has been Recorded! Thank You ❤️`,
      ]);
      setTimeout(() => {
        const average =
          (chapter_rating * rating_count + star_counter) / (rating_count + 1);
        setRating(parseFloat(average.toFixed(2)));
      }, 2000);
    };

    rater?.addEventListener("mousemove", handleHover);
    rater?.addEventListener("click", handleClick);
    rater?.addEventListener("mouseleave", handleLeave);
    return () => {
      rater?.removeEventListener("mousemove", handleHover);
      rater?.removeEventListener("click", handleClick);
      rater?.removeEventListener("mouseleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, star_counter]);

  return (
    <>
      <div className="flex">
        <div className="text-[1.25em] leading-[1em] font-semibold pl-[4px]">{`${rating} / 5.0`}</div>
        <button
          onClick={() => {
            setRating(chapter_rating);
            setStarCounter(chapter_rating);
            setChapterCookies("rating_list", chapter, 0);
            settings.messages.setState([
              ...settings.messages.state,
              `Your Vote has been Reset!`,
            ]);
          }}
          className="ml-[20px] h-[calc-size(auto,size)] w-[1.25em] scale-[110%] cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon/refresh.svg"
            alt="reset_rating"
            className="opacity-60 scale-[110%] rotate-y-180"
          />
        </button>
      </div>
      <div className="inline-flex h-[25px] cursor-pointer relative select-none">
        <div ref={ratingRef} className="h-full flex">
          {Array.from(Array(5)).map((_, i) => (
            <div key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id={`star-${i}`}
                src="/icon/star_hollow.png"
                alt="star_hollow"
                className={clsx(
                  "h-[25px] mx-[3px] relative z-20 pointer-events-none"
                )}
              />
              <div className="absolute top-[1.5px] z-0 mx-[3px] w-[24px] h-[24px] mask-[url(/icon/star.png)] mask-cover pointer-events-none">
                <div
                  className="w-full h-full bg-orange-300 relative transition-all duration-75 ease-out"
                  style={{
                    right: `${(1 - Math.min(star_counter - i, 1)) * 22.5}px`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
