import clsx from "clsx";
import { header_font } from "../../fonts";
import { tankobon_covers } from "../../variables";
import Image from "next/image";
import Link from "next/link";
import ThemeWrapper from "../../theme_wrapper";

function Introduction() {
  return (
    <div
      className={clsx(
        "m-auto w-[90%]  mb-[min(2.5vw,25px)]",
        `${header_font.className}`
      )}
    >
      <h2 className="text-xl font-semibold text-center">
        Download in PDF Format
      </h2>
    </div>
  );
}

function VolumeGallery() {
  const format_name = (vol: number, mode: string) =>
    `One Punch Man vol.${String(vol).length === 1 && "0"}${vol} (${mode}).pdf`;

  return (
    <div
      className={clsx(
        "w-[min(100vw,1200px)] h-[max(60vw,350px)] lg:h-[min(40vw,600px)] mx-auto"
      )}
    >
      <div
        className={clsx(
          "w-[90%] h-full m-auto grid grid-cols-3 lg:grid-cols-4",
          "overflow-x-hidden overflow-y-auto no-scrollbar"
        )}
      >
        {tankobon_covers.map((cover_url, i) => (
          <div
            key={i}
            className={clsx(
              "w-[min(25vw,250px)] md:w-[min(22vw,220px)] lg:w-[min(20vw,200px)] aspect-[2/3]",
              "mb-[min(5vw,50px)] mx-auto relative group"
            )}
          >
            <div className="w-full h-full rounded-[min(0.6vw,6px)] overflow-hidden relative">
              <Image
                fill
                // onClick={() => {}}
                src={cover_url}
                alt={`chapter_${i + 1}_cover`}
                style={{ objectFit: "cover" }}
              />
              <div
                className={clsx(
                  "text-m font-semibold italic w-full h-full flex flex-col absolute bg-black/30 top-0",
                  "group-hover:opacity-100 opacity-0 select-none transition duration-100",
                  `${header_font.className}`
                )}
              >
                {["One-Page", "Two-Page"].map((text, i) => (
                  <Link
                    key={i}
                    href={
                      "./tankobon/" + format_name(i + 1, text.toLowerCase())
                    }
                    download={format_name(i + 1, text.toLowerCase())}
                    className={clsx(
                      "mx-auto",
                      i === 0 ? "mt-[50%]" : "mt-[10%]"
                    )}
                  >
                    <button className="flex cursor-pointer bg-amber-400 border-[2px] border-gray-700 rounded-[8px] px-[1em] py-[0.125em] text-black">
                      <p className="mr-[0.25em]">{text}</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/icon/download.svg"
                        alt={"download_pdf_" + text.toLowerCase()}
                      />
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DownloadSection() {
  return (
    <ThemeWrapper light="bg-[#131b36]" dark="bg-gray-700/80">
      <section
        id="download"
        className={clsx(
          "w-full mt-[min(4vw,40px)] pb-[min(3vw,30px)] text-white"
        )}
      >
        <div className="w-full py-[min(5vw,50px)] h-full m-auto">
          <Introduction></Introduction>
          <VolumeGallery></VolumeGallery>
          <div className="mt-[min(2vw,20px)]">
            <p className="w-[min(80vw,1000px)] m-auto text-m">
              {"Note: Download the complete sources "}
              <Link
                href={"/download"}
                target="_blank"
                className="cursor-pointer text-blue-400 underline"
              >
                {"here."}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </ThemeWrapper>
  );
}

export default DownloadSection;
