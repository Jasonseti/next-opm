import clsx from "clsx";
import ThemeWrapper from "../../../theme-wrapper";
import SubscribeForm from "./subscribe";
import ContactForm from "./contact";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { main_font } from "../../../fonts";

export default function Footer() {
  return (
    <ThemeWrapper light="bg-[var(--primary-blue)]" dark="bg-[#01209]">
      <footer className="font-semibold text-white text-[1.1em]">
        <div
          className={clsx(
            "sm:flex justify-between hidden",
            "w-[min(90vw,1250px)] mx-auto py-[min(5vw,50px)]"
          )}
        >
          <div className="w-[30%] lg:w-[40%]">
            <Profile />
          </div>

          <div className="w-[64%] lg:w-[54%] flex flex-col">
            <div className="flex justify-between flex-auto">
              <div className="w-[30%]">
                <Legal />
              </div>
              <div className="w-[60%] h-full flex flex-col">
                <Contact />
              </div>
            </div>

            <div className="w-full mx-auto flex-none">
              <Subscribe />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "sm:hidden [&_div]:mb-[2vw]",
            "w-[90vw] mx-auto py-[min(5vw,50px)]"
          )}
        >
          <div className="w-full flex justify-between">
            <div className="w-[65%]">
              <Profile />
            </div>
            <div className="w-[25%]">
              <Legal />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[65%] flex flex-col">
              <Contact />
            </div>
            <div className="w-[25%] relative bottom-[4em] aspect-[2/3] border-[1.5px] rounded-[25px] overflow-hidden">
              <Meme />
            </div>
          </div>
          <div className="w-full">
            <Subscribe />
          </div>
        </div>
      </footer>
    </ThemeWrapper>
  );
}

function H3({ title }: { title: string }) {
  return (
    <>
      <h3 className={`${main_font.className} text-[1.35em]`}>{title}</h3>
      <hr className="w-[calc(100%+max(0.1vw,10px))] -ml-[0.5vw] mt-[min(0.5vw,5px)] mb-[min(2vw,20px)] border-[1px]" />
    </>
  );
}

function Profile() {
  return (
    <>
      <H3 title={"About Me"} />

      <div className="flex sm:flex-col lg:flex-row">
        <div className="w-[20vw] sm:w-[80%] lg:w-[40%] aspect-square m-auto outline-[1.5px] relative rounded-[100%] overflow-hidden">
          <Image
            fill
            src={"/common_image/profile_pic.jpeg"}
            alt="my_profile_picture"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>

        <div className="text-center mx-auto flex flex-col">
          <div className="my-[2vw]">
            <p className="text-[1.5em]">@ricebowlKenj1</p>
            <p>(+62) 812 9000 2230</p>
            <p>_ricebowlkenj1@gmail.com</p>
          </div>
          <div className="flex mx-auto sm:scale-[140%]">
            {[
              "https://discord.com",
              "https://instagram.com",
              "https://reddit.com",
              "https://github.com/Jasonseti",
            ].map((url, i) => (
              <SocialIcon
                className="mx-[min(0.5vw,5px)] rounded-[100%] border-1"
                style={{ height: 30, width: 30 }}
                key={i}
                url={url}
              ></SocialIcon>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Legal() {
  return (
    <>
      <H3 title={"Legal"} />
      {["DMCA", "Terms & Conditions", "Privacy Policy"].map((text, i) => (
        <p className="my-[0.5em] text-wrap" key={i}>
          <a href={`/news/${text}`}>{text}</a>
        </p>
      ))}
    </>
  );
}

function Contact() {
  return (
    <>
      <H3 title="Contact Us!"></H3>
      <ContactForm />
    </>
  );
}

function Subscribe() {
  return (
    <>
      <H3 title={"Subscribe to our Newsletter!"}></H3>
      <SubscribeForm />
    </>
  );
}

function Meme() {
  return (
    <Image
      fill
      src="/common_image/garou_bw.webp"
      alt="ok_meme_image"
      style={{ objectFit: "cover" }}
    ></Image>
  );
}
