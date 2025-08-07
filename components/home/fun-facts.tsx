"use client";
import { funfacts } from "../variables";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { header_font, quote_font } from "../fonts";

function FunFacts() {
  function getFact() {
    return funfacts[Math.floor(Math.random() * (funfacts.length - 1))];
  }
  const factRef = useRef<HTMLParagraphElement>(null);
  const [fact, setFact] = useState<string>(getFact());
  const nextFact = () => setFact(getFact());
  useEffect(() => {
    if (factRef.current) {
      factRef.current.style.fontSize = `${1.4 - fact.length / 600}em`;
    }
  }, [fact]);

  return (
    <section className="w-[min(100vw,1000px)] m-auto h-[max(min(30vw,250px),200px)] pb-[min(4vw,40px)] flex flex-col">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] h-full m-auto border-1 flex justify-center rounded-[20px] overflow-hidden">
        <div className="relative pointer-events-none h-[100%] aspect-square">
          <Image
            fill
            src="/images/opm_bg.webp"
            alt="fun fact image"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
        <div className="relative flex flex-col w-[100%] px-[min(2vw,20px)]">
          <h2
            className={`${header_font.className} italic text-l font-medium text-center pt-[10px]`}
          >
            Fun Fact
          </h2>
          <div ref={factRef} className="h-full flex">
            <p
              suppressHydrationWarning
              className={`${quote_font.className} my-auto text-m font-medium`}
            >
              <big className="leading-1 float-left text-[2.2em]">“</big>
              &nbsp;&nbsp;&nbsp;&nbsp;{fact}
              <big className="leading-1 float-right text-[2.2em]">&#8222;</big>
            </p>
          </div>
          <div className="h-[70px]"></div>
          <button
            className={`${header_font.className} font-medium text-m focus:border-0 rounded-[5px] bg-red-400 py-[2px] px-[10px] absolute right-[30px] bottom-[10px] cursor-pointer`}
            onClick={nextFact}
          >
            Next Fact
          </button>
        </div>
      </div>
    </section>
  );
}

export default FunFacts;
