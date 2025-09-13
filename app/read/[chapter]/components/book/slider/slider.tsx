"use client";
import clsx from "clsx";
import { useContext, useMemo } from "react";
import { StatesTypes, StatesContext } from "../../../state-provider";
import SlideWrapper from "./slide-wrapper";
import ImageBlock from "../image-block";
import Reception from "../reception";

export default function Slider({
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
  const two_page_map = useMemo(() => {
    const two_page_map: number[] = [];
    two_page_layouts.reduce((total, pages) => {
      if (pages.length === 1) {
        two_page_map.push(total);
        total = total + 1;
      } else {
        two_page_map.push(total);
        total =
          total + pages.reduce((tot, p) => tot + Number(p > -1 ? 1 : 0), 0);
      }
      return total;
    }, 1);
    return two_page_map;
  }, [two_page_layouts]);

  const page_height = useMemo(
    () => 0.9 * window.innerHeight,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [states.page_mode.state, states.read_mode.state]
  );

  return (
    <SlideWrapper images_length={image_urls.length} two_page_map={two_page_map}>
      <div className={clsx(is_two_page ? "hidden" : "block", "relative flex")}>
        {image_dimensions.map((_, i: number) => (
          <div
            key={i}
            id={`slide_one-page_page_${i + 1}`}
            style={{ width: window.innerWidth }}
            className="h-[100vh] flex px-[7.5vw] py-[5vh]"
          >
            <div
              style={{
                width:
                  (page_height * image_dimensions[i][0]) /
                  image_dimensions[i][1],
                height: page_height,
              }}
              className="mx-auto relative flex overflow-hidden rounded-[min(0.5vw,5px)]"
            >
              <ImageBlock
                image_url={image_urls[i]}
                image_dimension={image_dimensions[i]}
              />
            </div>
          </div>
        ))}
        <div
          style={{ width: window.innerWidth }}
          className="py-[5vh] h-[100vh] relative flex"
        >
          <Reception />
        </div>
      </div>

      <div className={clsx(is_two_page ? "block" : "hidden", "relative flex")}>
        {two_page_layouts.map((indexes, i) => (
          <div
            key={i}
            id={`slide_two-page_page_${i + 1}`}
            style={{ width: window.innerWidth }}
            className={clsx(
              "h-[100vh] flex justify-center px-[7.5vw] py-[5vh]",
              "flex-row-reverse nth-last-of-type-[2]:flex-row"
            )}
          >
            {indexes.map((index, j) =>
              index > -1 ? (
                <div
                  key={j}
                  style={{
                    width:
                      (page_height * image_dimensions[index][0]) /
                      image_dimensions[index][1],
                    height: page_height,
                  }}
                  className={clsx(
                    "relative overflow-hidden my-auto",
                    "first-of-type:rounded-r-[min(0.5vw,5px)] last-of-type:rounded-l-[min(0.5vw,5px)]"
                  )}
                >
                  <ImageBlock
                    image_url={image_urls[index]}
                    image_dimension={image_dimensions[index]}
                  />
                </div>
              ) : (
                <div
                  key={j}
                  style={{
                    width: page_height / 1.5,
                    height: page_height,
                  }}
                ></div>
              )
            )}
          </div>
        ))}
        <div
          style={{ width: window.innerWidth }}
          className="py-[5vh] h-[100vh] relative flex"
        >
          <Reception />
        </div>
      </div>
    </SlideWrapper>
  );
}
