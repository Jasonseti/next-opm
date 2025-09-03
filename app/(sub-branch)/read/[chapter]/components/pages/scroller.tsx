import clsx from "clsx";
import { ContextType } from "../../state_provider";
import LazyImage from "./lazy_image";
import Image from "next/image";
import PrevNext from "../ui/prev-next";
import { cover_chapters } from "../../../../../variables";

export default function Scroller({
  chapter,
  page_width,
  settings,
  image_urls,
  image_dimensions,
}: {
  chapter: string;
  page_width: number;
  settings: ContextType;
  image_urls: string[];
  image_dimensions: number[][];
}) {
  const two_page_layouts: number[][] = [];
  let placeholder: number[] = [];
  if (!cover_chapters.some((chp) => chp === chapter)) placeholder[0] = -1;
  for (let i = 0; i < image_urls.length; i++) {
    if (image_dimensions[i][0] > image_dimensions[i][1]) {
      two_page_layouts.push([i]);
    } else {
      placeholder.push(i);
    }
    if (placeholder.length === 2) {
      two_page_layouts.push(placeholder);
      placeholder = [];
    }
  }
  if (placeholder.length > 0) two_page_layouts.push([placeholder[0], -2]);

  const is_two_page: boolean =
    settings.page_mode.state.toLowerCase() === "two-page";

  return (
    <div className="m-auto">
      <div className="h-[50px]"></div>

      <div className={is_two_page ? "hidden" : "block"}>
        {image_urls.map((_, i: number) => (
          <div key={i} className="mb-[1em]">
            <div
              id={settings.read_mode.state + "_page_" + i}
              style={{
                width: page_width + "px",
                height:
                  page_width *
                    (image_dimensions[i][1] / image_dimensions[i][0]) +
                  "px",
              }}
              className="relative overflow-hidden rounded-[5px] flex"
            >
              <LazyImage
                image_url={image_urls[i]}
                load_method={image_dimensions[i][0] > 4000 ? "img" : "Image"}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={is_two_page ? "block" : "hidden"}>
        {two_page_layouts.map((indexes, i: number) => (
          <div
            key={i}
            className="mb-[1em] flex flex-wrap flex-row-reverse overflow-hidden rounded-[5px]"
          >
            {indexes.map((index, j) => (
              <div
                key={j}
                id={
                  settings.read_mode.state +
                  "_" +
                  settings.page_mode.state +
                  "_page_" +
                  index
                }
                style={{
                  width: (indexes.length === 1 ? 2 : 1) * page_width + "px",
                  height:
                    (indexes.length === 1 ? 2 : 1) *
                      page_width *
                      (index > -1
                        ? image_dimensions[index][1] /
                          image_dimensions[index][0]
                        : index === -2
                        ? image_dimensions[indexes[j - 1]][1] /
                          image_dimensions[indexes[j - 1]][0]
                        : image_dimensions[indexes[j + 1]][1] /
                          image_dimensions[indexes[j + 1]][0]) +
                    "px",
                }}
                className={clsx(
                  "relative flex",
                  (indexes[j + 1] === -2 || indexes[j - 1] === -1) &&
                    "rounded-[5px] overflow-hidden"
                )}
              >
                {index > -1 ? (
                  <LazyImage
                    image_url={image_urls[index]}
                    load_method={
                      image_dimensions[i][0] > 4000 ? "img" : "Image"
                    }
                  />
                ) : index === -2 ? (
                  <div className="relative border-1 border-white m-auto w-[80%] h-[80%]">
                    <Image
                      fill
                      src="/common_image/google_ads.webp"
                      style={{ objectFit: "cover" }}
                      alt="ads"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <PrevNext current_chapter={chapter} />
      <div className="h-[140px]"></div>
    </div>
  );
}
