import Accordion from "./ui/accordion";

function Appendix() {
  return (
    <section className="m-auto w-[min(100vw,1200px)] min-h-[400px] pt-[min(4vw,40px)] pb-[min(5vw,50px)] flex justify-around">
      <div className="border-1 w-[50%] flex py-[20px]">
        <div className="m-auto border-1 w-[80%] p-[3px]">
          <Accordion />
        </div>
      </div>
      <aside className="border-1 w-[40%]">
        <div className="m-auto"></div>
      </aside>
    </section>
  );
}

export default Appendix;
