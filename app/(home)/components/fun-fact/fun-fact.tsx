import clsx from "clsx";
import { fetchFunFacts } from "../../../lib/facts";
import FactsCard from "./facts-card";
import { Suspense } from "react";

export default async function FunFact() {
  return (
    <Suspense fallback={<FunFactSkeleton />}>
      <FunFactContent />
    </Suspense>
  );
}

async function FunFactContent() {
  const fact_arrays = await fetchFunFacts();
  const funfacts = fact_arrays.map((fact: { fact: string }) => fact.fact);

  return (
    <aside
      className={clsx(
        "w-[90vw] md:w-[80vw] max-w-[800px] aspect-[10/3] flex m-auto mb-[min(4vw,40px)]",
        "border-[5px] border-double rounded-[min(2vw,20px)] overflow-hidden",
        "text-[2vw] md:text-[1.8vw] lg:text-[min(1.5vw,15px)]"
      )}
    >
      <FactsCard funfacts={funfacts} />
    </aside>
  );
}

function FunFactSkeleton() {
  return (
    <aside
      className={clsx(
        "w-[90vw] md:w-[80vw] max-w-[800px] aspect-[10/3] m-auto pb-[min(4vw,40px)]",
        "bg-gray-400 animate-pulse border-[1.5px] border-gray-600"
      )}
    />
  );
}
