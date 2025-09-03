"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { main_font } from "../../../../../fonts";

export default function LazyImage({
  image_url,
  load_method = "Image",
}: {
  image_url: string;
  load_method?: string;
}) {
  const [method, setMethod] = useState<string>(load_method);
  const [status, setStatus] = useState("loading");

  return (
    <>
      {method === "Image" ? (
        <a
          href={image_url}
          className={clsx(
            status === "loading" && "bg-gray-300 animate-pulse",
            "w-[100%] h-[100%] cursor-default select-none"
          )}
          onClick={(e) => e.preventDefault()}
        >
          <Image
            fill
            src={image_url}
            alt="manga_image"
            style={{ objectFit: "cover" }}
            onLoad={() => setStatus("loaded")}
            onError={() => setMethod("img")}
            className={status === "error" ? "hidden" : "block"}
          />
        </a>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image_url}
          alt="manga_image"
          style={{ objectFit: "cover" }}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={clsx(
            "w-full h-full",
            status === "loading" && "bg-gray-300 animate-pulse",
            status === "error" ? "hidden" : "block"
          )}
        />
      )}

      <div
        className={clsx(
          status === "error" ? "block" : "hidden",
          "absolute top-0 w-full h-full rounded-[8px] border-[1.5px] border-white"
        )}
      >
        <div
          className={clsx(
            "w-[min(100%,600px)] absolute left-[calc(calc(100%-min(100%,600px))/2)] top-[45%] -translate-y-1/2",
            "text-white flex flex-col px-[10%]",
            `${main_font.className}`
          )}
        >
          <div className="select-none relative w-[25%] aspect-square m-auto">
            <Image
              fill
              src={"/icon/error.svg"}
              alt={"Failed to load Picture"}
            />
          </div>
          <h3 className={`text-[max(min(5vw,50px),25px)] text-center`}>
            Oops, Failed to Load Image!
          </h3>
          <button
            onClick={() => {
              setStatus("loading");
            }}
            className="cursor-pointer mx-auto mt-[0.5em] px-[1em] rounded-[10px] bg-blue-500 text-l select-none"
          >
            Reload
          </button>
        </div>
      </div>
    </>
  );
}
