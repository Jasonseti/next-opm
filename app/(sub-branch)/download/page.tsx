"use client";
import ThemeWrapper from "../../theme_wrapper";
import clsx from "clsx";
import { useState } from "react";
import { header_font } from "../../fonts";

function Folder({
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
    <div className={`${header_font.className} text-[1.1em]`}>
      <div
        onClick={() => setOpen(!is_open)}
        className="cursor-pointer flex justify-between"
      >
        <h4 className="font-semibold ml-[0.5em]">{folder_name}</h4>

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
export default function DonwloadPage() {
  return (
    <ThemeWrapper
      light="bg-gray-200 text-gray-800"
      dark="bg-gray-800 text-gray-300"
    >
      <section className="p-[40px] w-[100vw] h-[100vh]">
        <h1 className={`${header_font.className} font-semibold text-[2em]`}>
          Download Folders
        </h1>
        <div className="h-[0.75em]"></div>
        <div className="w-[min(40vw,300px)]">
          <Folder
            folder_name="Background Image"
            file_names={[
              "/background/opm_bg_sm.jpg",
              "/background/opm_bg_md.jpg",
              "/background/opm_bg_lg.jpg",
              "/background/opm_bg_xl.jpg",
            ]}
          />
          <Folder
            folder_name="Manga Sources"
            file_names={[
              "/sources/chapter_source.json",
              "/sources/volume_source.json",
            ]}
          />
        </div>
      </section>
    </ThemeWrapper>
  );
}
