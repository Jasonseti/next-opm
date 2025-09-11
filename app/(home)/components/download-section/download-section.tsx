import clsx from "clsx";
import { fetchVolumeCovers } from "../../../lib/chapters";
import ThemeWrapper from "../../../theme-wrapper";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { header_font } from "../../../fonts";

export default function DownloadSection() {
  return (
    <ThemeWrapper light="bg-[var(--primary-blue)]" dark="bg-[#01209]">
      <section id="download" className="py-[min(4vw,40px)] text-white">
        <div className={`${header_font.className} mb-[min(2.5vw,25px)]`}>
          <h2 className="text-[6vw] md:text-[min(5vw,50px)] font-semibold text-center">
            Download in PDF Format
          </h2>
        </div>

        <Suspense fallback={<VolumeGallerySkeleton />}>
          <VolumeGallery />
        </Suspense>

        <aside className="w-[min(85vw,1100px)] mx-auto my-[min(2vw,20px)]">
          <p className="text-[1.25em]">
            {"Note:  Download the complete sources "}
            <Link
              href={"/download"}
              target="_blank"
              className="cursor-pointer text-blue-400 underline"
            >
              {"here."}
            </Link>
          </p>
        </aside>
      </section>
    </ThemeWrapper>
  );
}

async function VolumeGallery() {
  const volume_covers = (await fetchVolumeCovers()).map(
    (cover: { cover_url: string }) => cover.cover_url
  );
  volume_covers.reverse();
  const format_name = (vol: number, mode: string) =>
    `One Punch Man vol.${String(vol).length === 1 && "0"}${vol} (${mode}).pdf`;

  return (
    <main
      className={clsx(
        "w-[90%] max-w-[1200px] h-[60vw] max-h-[600px] m-auto",
        "grid grid-cols-3 lg:grid-cols-4 overflow-auto no-scrollbar"
      )}
    >
      {volume_covers.map((cover_url: string, i: number) => (
        <div
          key={i}
          className={clsx(
            "w-[24vw] md:w-[22vw] max-w-[220px] aspect-[2/3]",
            "mb-[min(5vw,50px)] mx-auto group relative"
          )}
        >
          <div className="w-full h-full relative rounded-[min(0.5vw,5px)] overflow-hidden">
            <Image
              fill
              src={cover_url}
              alt={`chapter_${volume_covers.length - i}_cover`}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div
            className={clsx(
              "w-full h-full flex flex-col absolute top-0 z-10 bg-black/25",
              "group-hover:opacity-100 opacity-0 transition duration-100",
              `${header_font.className} font-semibold italic select-none`
            )}
          >
            {["One-Page", "Two-Page"].map((text, j) => (
              <Link
                key={j}
                href={
                  "./tankobon/" +
                  format_name(volume_covers.length - i, text.toLowerCase())
                }
                download={format_name(
                  volume_covers.length - i,
                  text.toLowerCase()
                )}
                className={clsx("mx-auto", j === 0 ? "mt-[50%]" : "mt-[10%]")}
              >
                <button
                  className={clsx(
                    "flex text-[1.2em] px-[1em] py-[0.125em] rounded-[min(0.8vw,8px)] cursor-pointer",
                    "bg-amber-400 border-[2px] border-gray-700 text-black"
                  )}
                >
                  <p className="mr-[0.25em]">{text}</p>
                  <div className="relative h-[1.5em] aspect-square">
                    <Image
                      fill
                      src="/icon/download.svg"
                      alt={"download_pdf_icon"}
                    />
                  </div>
                </button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

function VolumeGallerySkeleton() {
  return (
    <main
      className={clsx(
        "w-[90%] max-w-[1200px] h-[60vw] max-h-[600px] m-auto",
        "grid grid-cols-3 lg:grid-cols-4 overflow-auto no-scrollbar"
      )}
    >
      {Array.from(Array(10)).map((_, i: number) => (
        <div
          key={i}
          className={clsx(
            "w-[24vw] md:w-[22vw] lg:w-[min(20vw,200px)] aspect-[2/3]",
            "mb-[min(5vw,50px)] mx-auto group relative",
            "rounded-[min(0.5vw,5px)] bg-gray-400 animate-pulse"
          )}
        ></div>
      ))}
    </main>
  );
}
