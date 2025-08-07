import clsx from "clsx";
import { title_font } from "../fonts";
import CTAButton from "./ui/cta_button";

function LandingHead() {
  return (
    <section
      className={clsx(
        "w-full h-[max(min(40vw,380px),200px)] flex",
        "border-b-[2px] border-gray-500",
        "bg-[url('/images/bg-welcome.png'),_url('/images/ocean.png')] bg-[contain,_cover] bg-position-[right,_center] bg-no-repeat"
      )}
    >
      <div className={clsx("w-[min(100vw,1200px)] m-auto")}>
        <div className="h-full w-[60%] relative right-[15%] m-auto flex">
          <div className="mx-auto flex flex-col justify-center text-white">
            <div
              className={clsx(
                "flex flex-col mx-auto",
                `${title_font.className} font-semibold`
              )}
            >
              <h1 className="m-auto text-xxl font-bold text-nowrap">
                One Punch Man [PDF]
              </h1>
              <div
                className={clsx(
                  "flex justify-center flex-wrap",
                  "[&_span]:text-[max(min(2.5vw,1.5em),1em)] [&_span]:px-[0.2em]"
                )}
              >
                <span className="">Read Chapters Online.</span>
                <span className="">Download in PDF Format.</span>
              </div>
            </div>
            <div className="w-[80%] mx-auto pt-[min(3vw,35px)] flex flex-row justify-between px-[8px] lg:px-0">
              <CTAButton color="bg-red-400" href={"#read"}>
                Read
              </CTAButton>
              <CTAButton color="bg-yellow-300" href={"#download"}>
                Download
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHead;
