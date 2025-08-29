import clsx from "clsx";
import { header_font } from "../../fonts";
import ThemeWrapper from "./ui/theme_wrapper";

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
        {Array.from(Array(31)).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "w-[min(25vw,250px)] md:w-[min(22vw,220px)] lg:w-[min(20vw,200px)] aspect-[2/3]",
              "border-1 rounded-[min(0.6vw,6px)] cursor-pointer mb-[min(5vw,50px)] mx-auto"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}

function DownloadSection() {
  return (
    <ThemeWrapper>
      <section
        id="download"
        className={clsx("w-full mt-[min(4vw,40px)] pb-[min(5vw,50px)]")}
      >
        <div className="w-full py-[min(5vw,50px)] h-full m-auto">
          <Introduction></Introduction>
          <VolumeGallery></VolumeGallery>
        </div>
      </section>
    </ThemeWrapper>
  );
}

export default DownloadSection;
