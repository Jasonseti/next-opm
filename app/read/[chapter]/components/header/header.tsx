import clsx from "clsx";
import { HeaderDrawer } from "./header-drawer";
import { HomeLogo, UtilityIcons } from "./icons";
import PrevNext from "./prev-next";
import SettingsTab from "./settings";
import Summary from "./summary";
import Image from "next/image";
import { main_font } from "../../../../fonts";

interface HeaderProps {
  props: {
    chapter: string;
    title: string;
    brief_summary: string;
    long_summary: string;
    thumbnail: string;
    thumbnail_dimension: number[];
  };
  cookies: {
    favorited?: boolean;
    bookmarked?: boolean;
  };
}

export default function Header({ props, cookies }: HeaderProps) {
  // function MobileHeader() {
  //   return (
  //     <MobileDrawer>
  //       <section
  //         className={clsx(
  //           "w-[min(60vw,400px)] h-[min(80vh,800px)] border-[1.5px] border-l-0 bg-white rounded-r-[8px]",
  //           "shadow-[12px_12px_25px_0px_rgba(0,_0,_0,_0.5)] flex flex-col"
  //         )}
  //       >
  //         <main className="mx-auto w-[94%] flex flex-none pt-[2vh] relative">
  //           <MainDescriptions />
  //         </main>

  //         <main className="mt-[5%] flex-auto max-h-[45%] mb-[3%]">
  //           <Summary
  //             brief_summary={props.brief_summary}
  //             long_summary={props.long_summary}
  //           ></Summary>
  //         </main>
  //         <main className="h-[80px] flex-none mb-[2vh]">
  //           <SettingsTab />
  //         </main>
  //       </section>
  //     </MobileDrawer>
  //   );
  // }
  return (
    <>
      <HeaderDrawer>
        <section
          className={clsx(
            "w-[60%] h-full border-r-[1.8px] flex pl-[3%]",
            "text-[min(1.5vw,15px)]"
          )}
        >
          <div
            style={{
              aspectRatio:
                props.thumbnail_dimension[0] / props.thumbnail_dimension[1],
            }}
            className={clsx(
              "h-[90%] my-auto relative flex-none border-1",
              "rounded-[4px] overflow-hidden pointer-events-none select-none"
            )}
          >
            <Image
              width={props.thumbnail_dimension[0]}
              height={props.thumbnail_dimension[1]}
              src={props.thumbnail}
              alt="chapter_thumbnail"
            ></Image>
          </div>

          <MainUtilities props={props} cookies={cookies} />
        </section>

        <section
          className={`${main_font.className} w-[40%] flex flex-col font-semibold`}
        >
          <div className="h-[6%]" />
          <SettingsTab />
          <div className="h-[4%]" />
          <Summary
            brief_summary={props.brief_summary}
            long_summary={props.long_summary}
          />
        </section>
      </HeaderDrawer>
    </>
  );
}

function MainUtilities({ props, cookies }: HeaderProps) {
  return (
    <div
      className={clsx(
        `${main_font.className}`,
        "flex-auto h-full mx-[min(2vw,25px)]",
        "text-[1.25em] font-semibold text-black"
      )}
    >
      <div className="h-[6%]" />
      <HomeLogo />
      <div className="h-[4%]" />
      <UtilityIcons
        chapter={props.chapter}
        favorited={cookies.favorited}
        bookmarked={cookies.bookmarked}
      />
      <div className="h-[4%]" />
      <PrevNext />
      <div className="h-[4%]" />
      <div className="pl-[0.5em]">
        <h5 className="text-[1.1em] leading-[1.2em]">{`Chapter ${props.chapter} :`}</h5>
        <h2 className="text-[1.5em] leading-[1.2em]">
          {props.title.split(" | ")[0]}
        </h2>
      </div>
    </div>
  );
}
