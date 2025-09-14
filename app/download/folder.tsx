"use client";
import clsx from "clsx";
import { useState } from "react";
import { header_font } from "../fonts";

export default function Folder({
  folder_name,
  file_names,
}: {
  folder_name: string;
  file_names: string[];
}) {
  const [is_open, setOpen] = useState<boolean>(
    folder_name.toLowerCase() === "manga sources"
  );

  return (
    <div className={`${header_font.className}`}>
      <div
        onClick={() => setOpen(!is_open)}
        className="cursor-pointer flex justify-between"
      >
        <div className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon/folder.svg" alt="folder_open_icon" />
          <h4 className="font-semibold ml-[0.5em]">{folder_name}</h4>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={clsx(
            is_open ? "-rotate-90" : "rotate-0",
            "mr-[0.25em] h-full aspect-square scale-[80%] select-none"
          )}
          src="/icon/arrow_back.svg"
          alt="folder_open_icon"
        />
      </div>

      <hr className="mb-[0.5em] mt-[0.25em] w-full border-[1.5px] rounded-[10px]" />
      <div
        className={clsx(
          is_open ? "h-[calc-size(auto,size)]" : "h-0",
          "overflow-hidden"
        )}
      >
        {file_names.map((name, i) => (
          <div key={i} className="ml-[0.5em]">
            <a
              className="cursor-pointer text-blue-700 underline inline-flex pr-[1em]"
              href={name}
              download
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="select-none rotate-y-180 mr-[0.25em] h-[calc-size(auto,size)] aspect-square scale-[80%]"
                src="/icon/subdirectory.svg"
                alt="file_open_icon"
              />
              <p className="-mt-[0.25em]">
                {name.split("/")[name.split("/").length - 1]}
              </p>
            </a>
          </div>
        ))}
      </div>
      <div className="h-[0.25em]"></div>
    </div>
  );
}
