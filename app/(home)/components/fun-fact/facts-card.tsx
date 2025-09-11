"use client";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { header_font, secondary_font } from "../../../fonts";
import Image from "next/image";

export default function FactsCard({ funfacts }: { funfacts: string[] }) {
  const getFact = () =>
    funfacts[Math.floor(Math.random() * (funfacts.length - 1))];
  const [fact, setFact] = useState<string>("");
  const factRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setFact(getFact());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (factRef.current)
      factRef.current.style.fontSize = `${1.2 - fact.length / 600}em`;
  }, [fact]);

  return (
    <>
      <div className="relative h-full aspect-square flex-none pointer-events-none">
        <Image
          fill
          src="/common_image/garou_bw.webp"
          alt="fun_fact_image"
          style={{ objectFit: "cover" }}
        ></Image>
      </div>

      <div className="relative flex flex-col flex-auto px-[min(2vw,20px)] py-[min(1vw,10px)]">
        <h2
          className={`${header_font.className} italic text-[2em] font-semibold text-center flex-none`}
        >
          Did You Know That?
        </h2>
        <div
          ref={factRef}
          className={`${secondary_font.className} flex-auto flex font-medium relative`}
        >
          <big className="text-[2em] select-none absolute -top-[10%]">“</big>
          <p className="text-[1.3em] my-auto">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fact}&nbsp;
          </p>
          <big className="text-[2em] select-none absolute right-0 bottom-0">
            &#8222;
          </big>
        </div>

        <div className="flex-none flex flex-row-reverse">
          <button
            className={clsx(
              `${header_font.className} italic cursor-pointer`,
              "hover:scale-110 transition duration-100 ease-in-out",
              "text-[1.5em] font-medium"
            )}
            onClick={() => setFact(getFact())}
          >
            Next Fact
            <big className="text-[1.25em] font-bold">&nbsp;&#8594;</big>
          </button>
        </div>
      </div>
    </>
  );
}
