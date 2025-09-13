"use client";
import clsx from "clsx";
import { useContext, useMemo } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";
import Feedback from "./feedback";

import dynamic from "next/dynamic";
const Scroller = dynamic(() => import("./scroller/scroller"));
const Slider = dynamic(() => import("./slider/slider"));

export default function Book({
  image_urls,
  image_dimensions,
}: {
  image_urls: string[];
  image_dimensions: number[][];
}) {
  const states: StatesTypes = useContext(StatesContext);
  const read_mode = states.read_mode.state.toLocaleLowerCase();

  const two_page_layouts = useMemo(() => {
    const two_page_layouts: number[][] = [];
    const two_page_ratios: number[] = [];
    let placeholder: number[] = [];
    if (!states.cover_chapters.some((chp) => chp === states.chapter))
      placeholder[0] = -2;
    for (let i = 0; i < image_urls.length; i++) {
      if (image_dimensions[i][0] > image_dimensions[i][1]) {
        two_page_layouts.push([i]);
        two_page_ratios.push(1.0);
      } else {
        placeholder.push(i);
      }
      if (placeholder.length === 2) {
        two_page_layouts.push(placeholder);
        placeholder = [];
      }
    }
    if (placeholder.length > 0) two_page_layouts.push([placeholder[0], -1]);
    return two_page_layouts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        id="book_section"
        className="w-[100vw] h-[100vh] bg-[var(--primary-blue)] overflow-x-hidden"
      >
        <section className={clsx(read_mode === "scroll" ? "flex" : "hidden")}>
          <Scroller
            image_urls={image_urls}
            image_dimensions={image_dimensions}
            two_page_layouts={two_page_layouts}
          />
        </section>

        <section
          className={clsx(read_mode === "slide" ? "block" : "hidden", "m-auto")}
        >
          <Slider
            image_urls={image_urls}
            image_dimensions={image_dimensions}
            two_page_layouts={two_page_layouts}
          />
        </section>
      </section>
      <Feedback />
    </>
  );
}
