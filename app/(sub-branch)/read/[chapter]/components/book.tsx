"use client";
import clsx from "clsx";
import { useContext, useRef, useEffect, useState, useMemo } from "react";
import { ContextType, SettingsContext } from "../state_provider";

import dynamic from "next/dynamic";
const Scroller = dynamic(() => import("./pages/scroller"));
// const Slider = dynamic(() => import("./pages/slider"));

export default function Book({
  chapter,
  image_urls,
  image_dimensions,
}: {
  chapter: string;
  image_urls: string[];
  image_dimensions: number[][];
}) {
  const settings: ContextType = useContext(SettingsContext);
  const scroller = useRef<HTMLDivElement>(null);
  const read_mode = settings.read_mode.state.toLocaleLowerCase();
  const [is_scrolling_up, setScrollingUp] = useState<boolean>(false);
  const is_two_page: boolean =
    settings.page_mode.state.toLowerCase() === "two-page";

  const page_width = useMemo(
    () =>
      is_two_page
        ? Math.min(0.425 * window.innerWidth, (0.9 * window.innerHeight) / 1.5)
        : Math.min(0.85 * window.innerWidth, (0.9 * window.innerHeight) / 1.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings.page_mode.state]
  );
  // const [page_width, setPageWidth] = useState<number>(0);
  // useEffect(() => {
  //   setPageWidth(
  //     is_two_page
  //       ? Math.min(0.425 * window.innerWidth, (0.9 * window.innerHeight) / 1.5)
  //       : Math.min(0.85 * window.innerWidth, (0.9 * window.innerHeight) / 1.5)
  //   );
  // }, [is_two_page]);

  useEffect(() => {
    if (scroller.current) {
      const id = is_two_page
        ? `${settings.read_mode.state}_${settings.page_mode.state}_page_${settings.current_page.state}`
        : `${settings.read_mode.state}_page_${settings.current_page.state}`;
      const target_element = document.getElementById(id);

      if (target_element)
        scroller.current.scrollTop = target_element?.offsetTop - 50;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.read_mode.state, settings.page_mode.state]);

  useEffect(() => {
    // function debounce(func: (e: WheelEvent) => void, delay: number) {
    //   let timeout: ReturnType<typeof setTimeout>;

    //   return function (event: WheelEvent) {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //       func(event);
    //     }, delay);
    //   };
    // }

    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY < 0 && !(settings.current_page.state === 0)) {
        setScrollingUp(true);
        timeout = setTimeout(() => setScrollingUp(false), 2000);
      }

      for (let i = 0; i < image_urls.length; i++) {
        const id = is_two_page
          ? `${settings.read_mode.state}_${settings.page_mode.state}_page_${i}`
          : `${settings.read_mode.state}_page_${i}`;
        const target_element = document.getElementById(id);
        if (
          target_element &&
          scroller.current &&
          target_element?.offsetTop - 50 >= scroller.current.scrollTop
        ) {
          settings.current_page.setState(i);
          break;
        }
      }
    };

    scroller.current?.addEventListener("wheel", handleScroll);
    return () => {
      if (timeout) clearTimeout(timeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scroller.current?.removeEventListener("wheel", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.current_page,
    settings.page_mode.state,
    settings.read_mode.state,
  ]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const book_element = document.getElementById("book_section");
      if (book_element && book_element.contains(event.target as HTMLElement)) {
        settings.is_header_open.setState(!settings.is_header_open.state);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [settings.is_header_open]);

  return (
    <>
      <main>
        <div
          id="scroll_to_top"
          onClick={() => {
            settings.current_page.setState(0);
            if (scroller.current)
              scroller.current.scrollTo({
                top: 0,
                behavior: "smooth",
              });
          }}
          className={clsx(
            "fixed z-10 bottom-[18%] right-[8%] text-white cursor-pointer",
            "bg-white rounded-[25%] w-[60px] aspect-square border-[2px] border-black",
            is_scrolling_up && read_mode === "scroll"
              ? "opacity-80"
              : "opacity-0 pointer-events-none",
            "transition duration-200 select-none"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon/arrow_shape_up.svg"
            height="60px"
            width="60px"
            alt="scroll_to_top"
            className="scale-[80%]"
          />
        </div>
      </main>
      {/* Debugging Purpose */}
      {/* <div className="fixed top-0 text-white z-50">
        {settings.current_page.state}
      </div> */}
      <section id="book_section" className="w-[100vw] h-[100vh] flex">
        <div
          ref={scroller}
          id="scroll_reader"
          className={clsx(
            read_mode === "scroll" ? "flex" : "hidden",
            "h-[100vh] w-[100vw] overflow-y-scroll overflow-x-hidden no-scrollbar"
          )}
        >
          <Scroller
            chapter={chapter}
            page_width={page_width}
            settings={settings}
            image_urls={image_urls}
            image_dimensions={image_dimensions}
          />
        </div>

        {/* <div
          className={clsx(read_mode === "slide" ? "block" : "hidden", "m-auto")}
        >
          <Slider settings={settings} />
        </div> */}

        {/* <div
        className={clsx(
          settings.read_mode.state.toLowerCase() === "slide"
            ? "block"
            : "hidden",
          "w-full h-full"
        )}
      ></div> */}
      </section>
    </>
  );
}
