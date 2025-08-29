"use client";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";

export default function StarRating({ rate }: { rate: number }) {
  const [intial_rating, setInitial] = useState<number>(rate);
  const [rating, setRating] = useState<number>(rate);
  const rateRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rater = rateRef.current;
    const rater_width = rater ? rater.clientWidth : 0;
    const handleHover = (event: MouseEvent) => {
      setRating(Math.ceil((event.layerX / rater_width) * 10) / 2);
    };
    const handleClick = () => {
      setInitial(rating);
    };
    const handleLeave = () => {
      setRating(intial_rating);
    };
    if (rater) {
      rater.addEventListener("mousemove", handleHover);
      rater.addEventListener("click", handleClick);
      rater.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      rater?.removeEventListener("mousemove", handleHover);
      rater?.removeEventListener("click", handleClick);
      rater?.removeEventListener("mouseleave", handleLeave);
    };
  });

  return (
    <>
      <div className="text-[1.25em] leading-[1em] font-semibold pl-[4px]">{`${intial_rating} / 5.0`}</div>

      <div className="inline-flex h-[25px] cursor-pointer relative select-none">
        <div ref={rateRef} className="h-full flex">
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
                  style={{ right: `${(1 - Math.min(rating - i, 1)) * 25}px` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
