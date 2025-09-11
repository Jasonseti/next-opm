"use client";
import clsx from "clsx";
import { useState } from "react";
import { secondary_font, main_font } from "../../../fonts";

const faqs = {
  "What is One Punch Man?":
    "One Punch Man is a manga series created by artist ONE and illustrated by Yusuke Murata. It follows the story of Saitama, a hero who can defeat any opponent with a single punch.",
  "Is OPM Manga finished?":
    "Not at all ! The opm manga is currently ongoing so keep visiting our website for updates on the new and latest chapters.",
  "Are new chapters added regularly?":
    "We strive to update our site with new chapters as soon as they are available. Keep checking back for the latest updates.",
  "Where to watch One Punch Man anime?":
    "You can watch the opm anime on various streaming services such as Netflix, Hulu, Crunchyroll, BiliBili. Currenty, the streaming service BiliBili hosted the anime for free.",
};

export default function Accordion() {
  const initial_state = Array(Object.keys(faqs).length).fill(false);
  const [is_open, setOpen] = useState<boolean[]>(
    initial_state.toSpliced(Object.keys(faqs).length - 1, 1, true)
  );
  const handleClick = (i: number) =>
    setOpen(initial_state.toSpliced(i, 1, !is_open[i]));

  return (
    <>
      {Object.entries(faqs).map(([Q, A], i) => (
        <div key={i} className="mb-[min(1.5vw,15px)]">
          <div
            onClick={() => handleClick(i)}
            className={clsx(
              `${main_font.className} font-semibold`,
              "bg-white/70 rounded-t-[min(0.5vw,5px)] cursor-pointer",
              "px-[min(2vw,20px)] py-[min(1vw,10px)]",
              is_open[i] ? "rounded-b-0" : "rounded-b-[min(0.5vw,5px)]"
            )}
          >
            {Q}
          </div>
          <article
            className={clsx(
              "rounded-b-[min(1vw,10px)] overflow-hidden bg-gray-100",
              `${secondary_font.className}`,
              is_open[i] ? "h-[calc-size(auto,size)]" : "h-0",
              "origin-top transition-height duration-500 ease-in-out"
            )}
          >
            <p className="px-[min(2vw,20px)] py-[min(1vw,10px)]">{A}</p>
          </article>
        </div>
      ))}
    </>
  );
}
