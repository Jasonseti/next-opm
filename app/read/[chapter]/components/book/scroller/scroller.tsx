"use client";
import clsx from "clsx";
import { useMemo } from "react";
import { useContext } from "react";
import { StatesTypes, StatesContext } from "../../../state-provider";
import ScrollWrapper from "./scroll-wrapper";
import ImageBlock from "../image-block";
import Reception from "../reception";

export default function Scroller({
  image_urls,
  image_dimensions,
  two_page_layouts,
}: {
  image_urls: string[];
  image_dimensions: number[][];
  two_page_layouts: number[][];
}) {
  const states: StatesTypes = useContext(StatesContext);
  const is_two_page: boolean =
    states.page_mode.state.toLowerCase() === "two-page";

  const page_width = useMemo(
    () =>
      states.page_mode.state === "two-page"
        ? Math.min(0.425 * window.innerWidth, (0.9 * window.innerHeight) / 1.5)
        : Math.min(0.85 * window.innerWidth, (0.9 * window.innerHeight) / 1.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [states.page_mode.state, states.read_mode.state]
  );

  return (
    <ScrollWrapper images_length={image_urls.length}>
      <div className={is_two_page ? "hidden" : "block"}>
        {image_urls.map((_, i: number) => (
          <div
            key={i}
            id={`scroll_one-page_page_${i + 1}`}
            style={{
              width: page_width,
              height:
                page_width * (image_dimensions[i][1] / image_dimensions[i][0]),
            }}
            className="mb-[min(2vw,20px)] relative overflow-hidden rounded-[min(0.5vw,5px)]"
          >
            <ImageBlock
              image_url={image_urls[i]}
              image_dimension={image_dimensions[i]}
            />
          </div>
        ))}
        <div
          style={{
            width: page_width,
          }}
          className="text-[0.9em] aspect-[2/3] relative flex"
        >
          <Reception />
        </div>
      </div>

      <div className={is_two_page ? "block" : "hidden"}>
        {two_page_layouts.map((indexes, i: number) => (
          <div
            key={i}
            className={clsx("mb-[min(2vw,20px)]", "flex flex-row-reverse")}
          >
            {indexes.map((index, j) =>
              index > -1 ? (
                <div
                  key={j}
                  id={`scroll_two-page_page_${index + 1}`}
                  style={{
                    width:
                      ((indexes.length === 1 ? 2 : 1) *
                        (page_width *
                          indexes.reduce(
                            (total, index) =>
                              total +
                              image_dimensions[Math.max(index, 0)][1] /
                                image_dimensions[Math.max(index, 0)][0] /
                                indexes.length,
                            0
                          ))) /
                      (image_dimensions[index][1] / image_dimensions[index][0]),
                    height:
                      (indexes.length === 1 ? 2 : 1) *
                      page_width *
                      indexes.reduce(
                        (total, index) =>
                          total +
                          image_dimensions[Math.max(index, 0)][1] /
                            image_dimensions[Math.max(index, 0)][0] /
                            indexes.length,
                        0
                      ),
                  }}
                  className={clsx(
                    "relative flex",
                    "first-of-type:rounded-r-[min(0.5vw,5px)] last-of-type:rounded-l-[min(0.5vw,5px)] overflow-hidden"
                  )}
                >
                  {}
                  <ImageBlock
                    image_url={image_urls[index]}
                    image_dimension={image_dimensions[index]}
                  />
                </div>
              ) : index === -1 ? (
                <div
                  key={j}
                  id={`scroll_two-page_page_${index + 1}`}
                  style={{
                    width: page_width,
                  }}
                  className="text-[0.9em] h-[calc-size(size,auto)] relative flex"
                >
                  <Reception />
                </div>
              ) : (
                <div
                  key={j}
                  id={`scroll_two-page_page_${index + 1}`}
                  style={{
                    width: page_width,
                  }}
                  className="text-[0.9em] h-[calc-size(size,auto)] relative flex"
                ></div>
              )
            )}
          </div>
        ))}
      </div>

      {states.cover_chapters.includes(
        states.chapter_list[states.chapter_index + 1]
      ) && (
        <div
          style={{
            width: page_width,
          }}
          className="mx-auto text-[0.9em] aspect-[2/3] relative flex"
        >
          <Reception />
        </div>
      )}
    </ScrollWrapper>
  );
}
