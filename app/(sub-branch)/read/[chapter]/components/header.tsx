import clsx from "clsx";
// import StarRating from "./ui/star_rating";
import { main_font } from "../../../../fonts";
import { HomeLogo, Utility_Icons } from "./ui/icons";
import Image from "next/image";
import SettingsTab from "./ui/settings";
import Summary from "./ui/summary";
import PrevNext from "./ui/prev-next-header";
import { TopDrawer, MobileDrawer } from "./ui/drawer";

export default function Header({
  props,
  cookies,
}: {
  props: {
    chapter: string;
    title: string;
    brief_summary: string;
    long_summary: string;
    thumbnail: string;
  };
  cookies: {
    favorited?: boolean;
    bookmarked?: boolean;
  };
}) {
  function MainDescriptions() {
    return (
      <div
        className={clsx(
          `${main_font.className}`,
          "mr-[5px] sm:mr-0 mt-0 sm:mt-[3%] md:mt-[4%] lg:scale-[120%] lg:mt-[6%] lg:ml-[8%]",
          "w-[90%] sm:w-[50%] ml-[min(2vw,25px)]"
        )}
      >
        <HomeLogo />
        {/* <div className="h-[5px]"></div> */}
        <Utility_Icons
          chapter={props.chapter}
          favorited={cookies.favorited}
          bookmarked={cookies.bookmarked}
        />
        <div className="h-[10px]"></div>
        {/* <StarRating
          chapter={props.chapter}
          chapter_rating={props.rating}
          rating_count={props.rating_count}
          user_rating={cookies.user_rating}
        /> */}
        <div className="h-[5px]"></div>
        <PrevNext current_chapter={props.chapter} />
        <div className="h-[8px]"></div>
        <div>
          <h5 className="text-m leading-[1em]">{`Chapter ${props.chapter} :`}</h5>
          <h2 className="text-l font-semibold leading-[1.1em]">
            {props.title.split(" | ")[0]}
          </h2>
        </div>
      </div>
    );
  }

  function TopHeader() {
    return (
      <TopDrawer>
        <section
          className={clsx(
            "shadow-[12px_12px_25px_0px_rgba(0,_0,_0,_0.5)] rounded-b-[15px]",
            "h-full w-full m-auto flex",
            "bg-[whitesmoke] bg-contain bg-center bg-no-repeat relative z-20"
          )}
        >
          <figure className="h-[45px] aspect-square absolute bottom-[3%] left-[54%] -translate-x-1/1 cursor-help">
            <Image
              fill
              style={{ objectFit: "contain" }}
              src="/sticker/moon_sticker.png"
              alt="saitama on moon"
            ></Image>
          </figure>

          <main className="border-r-[1.8px] w-[55%] h-[max(min(30vw,300px),90px)] flex justify-center">
            <div className="border-[1.8px] rounded-[4px] overflow-hidden w-[min(35%,180px)] my-auto aspect-[860/1263] relative pointer-events-none select-none">
              <Image
                fill
                src={props.thumbnail}
                alt="chapter_thumbnail"
                style={{ objectFit: "cover" }}
              ></Image>
            </div>

            <MainDescriptions />
          </main>

          <main
            className={clsx(
              `${main_font.className} font-[500] text-[0.9em]`,
              "w-[45%] h-full flex flex-col mt-[8px]"
            )}
          >
            <SettingsTab />
            <Summary
              brief_summary={props.brief_summary}
              long_summary={props.long_summary}
            ></Summary>
          </main>
        </section>
      </TopDrawer>
    );
  }
  function MobileHeader() {
    return (
      <MobileDrawer>
        <section
          className={clsx(
            "w-[min(60vw,400px)] h-[min(80vh,800px)] border-[1.5px] border-l-0 bg-white rounded-r-[8px]",
            "shadow-[12px_12px_25px_0px_rgba(0,_0,_0,_0.5)] flex flex-col"
          )}
        >
          <main className="mx-auto w-[94%] flex flex-none pt-[2vh] relative">
            <MainDescriptions />
          </main>

          <main className="mt-[5%] flex-auto max-h-[45%] mb-[3%]">
            <Summary
              brief_summary={props.brief_summary}
              long_summary={props.long_summary}
            ></Summary>
          </main>
          <main className="h-[80px] flex-none mb-[2vh]">
            <SettingsTab />
          </main>
        </section>
      </MobileDrawer>
    );
  }
  return (
    <>
      <div className="sm:block hidden">
        <TopHeader />
      </div>
      <div className="sm:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
