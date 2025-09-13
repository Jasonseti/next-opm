"use client";
import clsx from "clsx";
import { useState, useContext, useRef, useEffect } from "react";
import { StatesTypes, StatesContext } from "../../../state-provider";
import Image from "next/image";

export default function ScrollWrapper({
  children,
  images_length,
}: {
  children: React.ReactNode;
  images_length: number;
}) {
  const states: StatesTypes = useContext(StatesContext);
  const scroll_wrapper = useRef<HTMLDivElement>(null);
  const [is_scrolling_up, setScrollingUp] = useState<boolean>(false);

  useEffect(() => {
    if (scroll_wrapper.current) {
      const id = `${states.read_mode.state}_${states.page_mode.state}_page_${states.current_page.state}`;
      const target_element = document.getElementById(id);
      if (target_element)
        scroll_wrapper.current.scrollTop = target_element?.offsetTop - 50;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.read_mode.state, states.page_mode.state]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (is_scrolling_up)
      timeout = setTimeout(() => setScrollingUp(false), 2000);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [is_scrolling_up]);

  useEffect(() => {
    if (!scroll_wrapper.current) return;
    const scroller = scroll_wrapper.current;

    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY < 0 && scroller.scrollTop > 0) {
        setScrollingUp(true);
      }

      for (let i = 1; i <= images_length; i++) {
        const id = `scroll_${states.page_mode.state}_page_${i}`;
        const target_element = document.getElementById(id);
        if (
          target_element &&
          target_element?.offsetTop - 50 >= scroller.scrollTop
        ) {
          states.current_page.setState(i);
          break;
        }
      }
    };

    scroller.addEventListener("wheel", handleScroll);
    return () => scroller.removeEventListener("wheel", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.page_mode.state]);

  return (
    <div
      id={"scroll_wrapper"}
      ref={scroll_wrapper}
      className="w-[100vw] h-[100vh] overflow-y-scroll no-scrollbar flex"
    >
      {/* <div className="fixed top-0 text-white z-50">
        {states.current_page.state}
      </div> */}
      <div className="pt-[50px] pb-[150px] m-auto">{children}</div>
      <aside>
        <div
          id="scroll_to_top"
          onClick={() => {
            states.current_page.setState(1);
            if (scroll_wrapper.current)
              scroll_wrapper.current.scrollTo({
                top: 0,
                behavior: "smooth",
              });
          }}
          className={clsx(
            "fixed bottom-[18%] right-[8%] text-white",
            "bg-white rounded-[20%] w-[60px] aspect-square border-[2px] border-black",
            is_scrolling_up ? "opacity-85" : "opacity-0 pointer-events-none",
            "transition duration-200 cursor-pointer select-none"
          )}
        >
          <Image
            height={60}
            width={60}
            src="/icon/arrow_shape_up.svg"
            alt="scroll_to_top_icon"
            className="scale-[80%]"
          />
        </div>
      </aside>
    </div>
  );
}
