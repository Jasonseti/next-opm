"use client";
import clsx from "clsx";
import { useEffect, useContext } from "react";
import { ContextType } from "../../state_provider";
import { ImageType, ImageProvider } from "../book";
import PageImage from "./lazy_image";
import { clip_by } from "../book";

export default function Slider({ settings }: { settings: ContextType }) {
  const { image_urls, image_dimensions }: ImageType = useContext(ImageProvider);
  const page_width = (settings.scale.state / 100) * window.innerHeight * 1.5;
  let total_pages = -1;
  for (let i = 0; i < image_dimensions.length; i++) {
    if (image_dimensions[i][0] < image_dimensions[i][1]) {
      total_pages += 1;
    } else {
      total_pages += 2;
    }
  }

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (settings.read_mode.state.toLowerCase() === "slide") {
        settings.current_page.setState(
          clip_by(
            settings.current_page.state + (event.deltaY > 0 ? 1 : -1),
            0,
            total_pages
          )
        );
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      event.preventDefault();
      if (!(event.key === "ArrowLeft" || event.key === "ArrowRight")) return;
      if (settings.read_mode.state.toLowerCase() === "slide") {
        settings.current_page.setState(
          clip_by(
            settings.current_page.state + (event.key === "ArrowRight" ? 1 : -1),
            0,
            total_pages
          )
        );
      }
    };
    const handleMobile = () => {
      // if (wrapper) setPage(Math.round(wrapper.scrollLeft / page_width) + 1);
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKey);
    // wrapper?.addEventListener("dragend", handleMobile);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKey);
      // wrapper?.removeEventListener("dragend", handleMobile);
    };
  });

  function Page({ i, left = 0 }: { i: number; left?: number }) {
    return (
      <div
        key={i}
        style={{ width: `${page_width}px` }}
        className={clsx("select-none flex-none relative")}
      >
        <div
          style={{
            width:
              ((((window.innerHeight * settings.scale.state) / 100) *
                image_dimensions[i][0]) /
                image_dimensions[i][1]) *
                (image_dimensions[i][0] < image_dimensions[i][1] ? 1 : 0.5) +
              "px",
          }}
          className="h-[100%] mx-auto overflow-hidden"
        >
          <PageImage
            index={i}
            image_url={image_urls[i]}
            image_dimension={image_dimensions[i]}
            settings={settings}
            priority="height"
            translate_left={left}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-[100vw] overflow-auto no-scrollbar">
      <div
        style={{
          left: `${
            (window.innerWidth - page_width) / 2 -
            settings.current_page.state * page_width
          }px`,
          transitionDuration: `${settings.duration.state}ms`,
        }}
        className="flex relative transition-all ease-in-out"
      >
        {Array.from(Array(image_urls.length)).map((_, i: number) => (
          <div key={i} className="flex">
            {image_dimensions[i][0] < image_dimensions[i][1] ? (
              <Page i={i} />
            ) : (
              <>
                <Page
                  i={i}
                  left={
                    ((((window.innerHeight * settings.scale.state) / 100) *
                      image_dimensions[i][0]) /
                      image_dimensions[i][1]) *
                    -0.5
                  }
                />
                <Page i={i} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
