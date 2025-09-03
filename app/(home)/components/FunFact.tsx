"use client";
import clsx from "clsx";
import { funfacts } from "../../variables";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { header_font, secondary_font } from "../../fonts";

function FunFact() {
  function getFact() {
    return funfacts[Math.floor(Math.random() * (funfacts.length - 1))];
  }
  const factRef = useRef<HTMLParagraphElement>(null);
  const [fact, setFact] = useState<string>("");
  const nextFact = () => setFact(getFact());

  useEffect(() => {
    if (!fact) setFact(getFact());
    if (factRef.current) {
      if (window.innerWidth > 640) {
        factRef.current.style.fontSize = `${1.3 - fact.length / 600}em`;
      } else {
        factRef.current.style.fontSize = `${1.2 - fact.length / 500}em`;
      }
    }
  }, [fact]);

  return (
    <section className="w-[min(100vw,800px)] m-auto h-[max(min(30vw,250px),200px)] pb-[min(4vw,40px)] flex flex-col">
      <div
        className={clsx(
          "w-[min(90%,1000px)] h-full m-auto border-[5px] flex justify-center overflow-hidden",
          "border-double rounded-bl-[8px] rounded-tl-[16px] rounded-tr-[8px] rounded-br-[16px]"
        )}
      >
        <div className="relative pointer-events-none border-r-[5px] border-double w-[min(30%,180px)] aspect-square">
          <Image
            fill
            src="/common_image/garou_bw.webp"
            alt="fun fact image"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
        <div className="relative flex flex-col w-[100%] px-[min(2vw,20px)]">
          <h2
            className={`${header_font.className} italic text-l font-semibold text-center pt-[2%]`}
          >
            Did You Know That?
          </h2>
          <div ref={factRef} className="h-full flex">
            <p
              className={`${secondary_font.className} my-auto text-m font-medium`}
            >
              <big className="leading-1 float-left text-[2em]">“</big>
              &nbsp;&nbsp;&nbsp;&nbsp;{fact}
              <big className="leading-1 float-right text-[2em]">&#8222;</big>
            </p>
          </div>
          <div className="h-[60px]"></div>
          <button
            className={`${header_font.className} italic font-medium text-m hover:scale-110 transition duration-100 ease-in-out border-0 absolute right-[min(10%,35px)] bottom-[5%] cursor-pointer`}
            onClick={nextFact}
          >
            Next Fact
            <big className="text-[1.2em] font-bold">&nbsp;&#8594;</big>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FunFact;
