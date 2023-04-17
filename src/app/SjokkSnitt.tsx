import { ShockData, ShockednessSample } from "@/lib/shockReport";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export type ShockLevel =
  | "not"
  | "wayLess"
  | "less"
  | "normal"
  | "more"
  | "wayMore";

const sjokkLevels: Record<ShockLevel, JSX.Element> = {
  not: <span className={"text-red font-bold"}>overhodet ikke</span>,
  wayLess: <span className={"text-red font-bold"}>under normalt</span>,
  less: <span className={"text-red font-bold"}>noe under normalt</span>,
  normal: <span className={"text-red font-bold"}>normalt</span>,
  more: <span className={"text-red font-bold"}>uvanlig</span>,
  wayMore: <span className={"text-red font-bold"}>ekstremt</span>,
};

export const getRelativeShock = (
  averageSjokk: number,
  currentSjokk: number
) => {
  if (!currentSjokk) return "not";

  const difference = Math.abs(averageSjokk - currentSjokk);

  if (difference <= 0.5) return "normal";

  if (currentSjokk > averageSjokk) {
    if (difference > 2) return "wayMore";
    return "more";
  } else {
    if (difference > 2) return "wayLess";
    return "less";
  }
};

const RelativtSjokk = ({ level }: { level: ShockLevel }) => (
  <h2 className={"text-xl sm:text-3xl"}>
    – Dagbladet er {sjokkLevels[level]} sjokkert:
  </h2>
);

function SjokkListe({ newest }: { newest: ShockednessSample }) {
  return (
    <div className={"flex flex-wrap gap-2"}>
      {newest.sjokk
        .sort((a, b) => b.length - a.length)
        .map((x, i) => (
          <div
            key={i}
            className={
              "px-2 py-1 bg-red font-bold text-lg text-white whitespace-nowrap"
            }
          >
            {x}
          </div>
        ))}
    </div>
  );
}

function SjokkTallene({
  rapport: { newest, shocks, avgShocks },
}: {
  rapport: ShockData;
}) {
  return (
    <div className={"space-y-2"}>
      <h3 className={"text-2xl font-bold pb-1"}>Se sjokktallene:</h3>
      <div>
        Ordet «sjokk» forekommer {newest.sjokkCount === 1 ? "bare " : ""}
        {newest.sjokkCount} {newest.sjokkCount === 1 ? "gang" : "ganger"} på
        forsiden (per{" "}
        {format(newest.timestamp, "dd. MMMM HH:mm", {
          locale: nb,
        })}
        ).
      </div>
      <div>
        Gjennomsnitt (av {shocks.length} målinger siden{" "}
        {format(shocks[shocks.length - 1].timestamp, "dd. MMMM yyyy", {
          locale: nb,
        })}
        ) er {avgShocks.toFixed(2)}.
      </div>
    </div>
  );
}

export const SjokkSnitt = ({ rapport }: { rapport: ShockData }) => {
  const { newest, avgShocks } = rapport;
  return (
    <div className={"bg-yellow text-black max-lg:flex-grow"}>
      <div
        className={"lg:mx-auto w-full max-w-2xl p-4 lg:p-12 h-max space-y-4"}
      >
        <h1 className={"text-3xl sm:text-5xl font-black"}>SJOKKRAPPORT:</h1>
        <RelativtSjokk level={getRelativeShock(avgShocks, newest.sjokkCount)} />
        <SjokkListe newest={newest} />
        <SjokkTallene rapport={rapport} />
      </div>
    </div>
  );
};
