import clsx from "clsx";
import { main_font } from "../fonts";

function Introduction() {
  return (
    <div
      className={clsx(
        "m-auto w-[min(65%,700px)]",
        "[&_pre]:text-wrap [&_pre]:text-[min(2.7vw,0.95em)] [&_pre]:py-[3px]",
        `${main_font.className}`
      )}
    >
      <h2 className="text-[max(min(3.8vw,2.2em),1.5em)] text-center">
        Download in PDF Format
      </h2>
    </div>
  );
}

function VolumeGallery() {
  return (
    <div
      className={clsx(
        "w-[min(100vw,1200px)] h-[max(min(70vw,700px),300px)]",
        "m-auto"
      )}
    >
      <div className="overflow-x-hidden overflow-y-scroll scroll-auto no-scrollbar h-full w-[85%] m-auto mt-[min(4vw,25px)] grid grid-cols-3 xl:grid-cols-4 gap-[min(4vw,40px)]">
        {Array(14)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-[min(22vw,220px)] h-[min(33vw,330px)] flex-none border-1 cursor-pointer m-auto"
            ></div>
          ))}
      </div>
    </div>
  );
}
function DownloadSection() {
  return (
    <section id="download" className="w-full bg-orange-300 pb-[min(5vw,50px)]">
      <div className="w-full py-[min(5vw,50px)] h-full m-auto">
        <Introduction></Introduction>
        <VolumeGallery></VolumeGallery>
      </div>
    </section>
  );
}

export default DownloadSection;
