import { SjokkData } from "@/lib/sjokkRapport";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export type SjokkLevel = "wayLess" | "less" | "normal" | "more" | "wayMore";

const sjokkLevels: Record<SjokkLevel, JSX.Element> = {
  wayLess: <span className={"text-white font-bold"}>under normalt</span>,
  less: <span className={"text-white font-bold"}>noe under normalt</span>,
  normal: <span className={"text-white font-bold"}>normalt</span>,
  more: <span className={"text-white font-bold"}>uvanlig</span>,
  wayMore: <span className={"text-white font-bold"}>ekstremt</span>,
};

export const getRelativeShock = (
  averageSjokk: number,
  currentSjokk: number
) => {
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

const RelativtSjokk = ({ level }: { level: SjokkLevel }) => sjokkLevels[level];

export const SjokkSnitt = ({ rapport }: { rapport: SjokkData }) => {
  const { sjokk, newest, avgShocks } = rapport;
  return (
    <div className={"p-12 bg-red text-white w-full max-w-xl"}>
      <h1 className={"text-5xl font-black"}>SJOKKRAPPORT:</h1>
      <h2 className={"text-3xl py-4"}>
        – Dagbladet er{" "}
        <RelativtSjokk level={getRelativeShock(avgShocks, newest.sjokkCount)} />{" "}
        sjokkert
      </h2>
      <div className={"font-bold text-lg"}>
        Ordet «sjokk» forekommer {newest.sjokkCount} ganger på forsiden.
      </div>
      <div>
        Gjennomsnitt (av {sjokk.length} målinger siden{" "}
        {format(sjokk[sjokk.length - 1].timestamp, "dd. MMMM yyyy", {
          locale: nb,
        })}
        ) er {avgShocks.toFixed(2)}.
      </div>
    </div>
  );
};
