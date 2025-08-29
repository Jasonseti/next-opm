import { quote_font, secondary_font } from "../../fonts";

function Headline() {
  return (
    <div className="w-[100%] md:w-[65%] m-auto md:m-0">
      <h2
        className={`${quote_font.className} px-[2.5%] md:px-0 text-center text-l -mt-[10px] mb-[10px] font-bold`}
      >
        One Punch Man Season 3 is Finally Coming on October 2025!
      </h2>
      <div className="md:w-full w-[90%] mx-auto cursor-pointer relative rounded-[7px] overflow-hidden">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/C0M93res8Z0?cc_load_policy=1"
          title="One Punch Man Season 3 Trailer"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function LargeScreenArticles() {
  return (
    <div className="md:hidden w-[90%] m-auto my-[10px]">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="text-m h-[min(15vw,95px)] my-[5px] border-[1.5px] rounded-[8px] px-[10px] py-[2px] overflow-hidden"
        >
          <a href="">
            <div className={`${quote_font.className} flex text-[1.25em]`}>
              <h3 className="w-full font-semibold">News Title</h3>
              <p className="text-right w-full mt-[2px] text-[0.9em]">
                {"3 July 2025"}
              </p>
            </div>

            <p
              className={`${secondary_font.className} text-wrap text-[1em] leading-[1.4em]`}
            >
              {"asfsg sietjwe twk nfsldfn s ldk nfsl kdfnslkdfn sldk asfsg asdasfa asfsg sietjwe twk nfsldfn s ldk nfsl kdfnslkdfn sldk asfsg asdasfa".slice(
                0,
                100
              ) + " . . ."}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}
function SmallScreenArticles() {
  return (
    <div className="w-[33%] hidden md:flex flex-col justify-between">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[30%] rounded-[8px] px-[10px] py-[5px] border-[1.5px] overflow-hidden text-m"
        >
          <a href="">
            <div className={`${quote_font.className} flex`}>
              <h3 className="w-full font-semibold">News Title</h3>
              <p className="text-right w-full mt-[2px] text-[0.9em]">
                {"3 July 2025"}
              </p>
            </div>
            <p
              className={`${secondary_font.className} text-wrap text-[0.8em] leading-[1.4em]`}
            >
              {"asfsg sietjwe twk nfsldfn s ldk nfsl kdfnslkdfn sldk asfsg asdasfa asfsg sietjwe twk nfsldfn s ldk nfsl kdfnslkdfn sldk asfsg asdasfa".slice(
                0,
                80
              ) + " . . ."}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}

function NewsSection() {
  return (
    <section className="w-full">
      <div className="w-[min(90%,1000px)] bg-[#cc253b] text-white py-[min(4vw,40px)] md:px-[min(6vw,60px)] px-[min(2vw,20px)] rounded-b-[10px] m-auto md:flex justify-between">
        <Headline />

        <LargeScreenArticles />
        <SmallScreenArticles />
      </div>
    </section>
  );
}

export default NewsSection;
