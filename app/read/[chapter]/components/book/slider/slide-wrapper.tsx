"use client";
import { useRef, useEffect, useContext, useState } from "react";
import { StatesTypes, StatesContext } from "../../../state-provider";

export default function SlideWrapper({
  children,
  images_length,
  two_page_map,
}: {
  children: React.ReactNode;
  images_length: number;
  two_page_map: number[];
}) {
  const states: StatesTypes = useContext(StatesContext);
  const is_two_page: boolean =
    states.page_mode.state.toLowerCase() === "two-page";
  const slide_wrapper = useRef<HTMLElement>(null);
  const [slide_page, setSlidePage] = useState<number>(
    states.current_page.state
  );
  const clip = (val: number, max: number) => Math.max(Math.min(val, max), 1);

  useEffect(() => {
    if (!slide_wrapper.current) return;
    const slider = slide_wrapper.current;
    const setPage = (direction: number) => {
      if (states.page_mode.state === "one-page") {
        if (slide_page + direction > images_length) {
          setSlidePage(images_length + 1);
          return;
        }
        if (slide_page + direction === images_length) {
          setSlidePage(images_length);
        }
      }
      if (states.page_mode.state === "two-page") {
        if (slide_page + direction > two_page_map.length) {
          setSlidePage(two_page_map.length + 1);
          return;
        }
        if (slide_page + direction === two_page_map.length) {
          setSlidePage(two_page_map.length);
        }
      }
      const max_value = is_two_page ? two_page_map.length : images_length;
      const page = clip(slide_page + direction, max_value);
      states.current_page.setState(is_two_page ? two_page_map[page - 1] : page);
    };

    const handleScroll = (e: WheelEvent) => {
      setPage(e.deltaY > 0 ? 1 : -1);
    };
    const handlePress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight")
        setPage(e.key === "ArrowRight" ? 1 : -1);
    };

    slider.addEventListener("wheel", handleScroll);
    slider.addEventListener("keydown", handlePress);
    return () => {
      slider.removeEventListener("wheel", handleScroll);
      slider.removeEventListener("keydown", handlePress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide_page]);

  useEffect(() => {
    setSlidePage(
      is_two_page
        ? states.current_page.state < images_length
          ? two_page_map.findIndex(
              (page: number) => page > states.current_page.state
            )
          : two_page_map.length
        : states.current_page.state
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.page_mode.state, states.current_page.state]);

  return (
    <section
      ref={slide_wrapper}
      style={{ width: window.innerWidth }}
      className="h-[100vh] overflow-hidden flex"
    >
      <div
        style={{ left: (slide_page - 1) * -window.innerWidth }}
        className="relative flex transition-all duration-300"
      >
        {/* Debugging Purposes */}
        {/* <div className="fixed left-0 text-white z-50">{slide_page}</div> */}
        {children}
      </div>
    </section>
  );
}
