import clsx from "clsx";
import { main_font } from "../fonts";
import CTAButton from "./ui/cta_button";

function LandingHead() {
  return (
    <section
      className={clsx(
        "w-full h-[max(min(45vw,500px),300px)]",
        "border-b-[2px] border-gray-500 overflow-hidden",
        "bg-[url('/bg-welcome.png'),_url('/ocean.png')] bg-[contain,_cover] bg-position-[right,_center] bg-no-repeat"
      )}
    >
      <div
        className={clsx(
          "pb-[40px] w-[min(100vw,1200px)] h-[max(min(45vw,500px),300px)] m-auto"
        )}
      >
        <div className="h-full w-[60%] relative right-[15%] m-auto flex">
          <div className="m-auto">
            <div
              className={clsx("flex flex-col m-auto", `${main_font.className}`)}
            >
              <h1 className="m-auto text-[max(min(5vw,3.2em),1.5em)] text-nowrap">
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
            <div className="w-[80%] m-auto pt-[min(3vw,35px)] flex flex-row justify-between px-[8px] lg:px-0">
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
