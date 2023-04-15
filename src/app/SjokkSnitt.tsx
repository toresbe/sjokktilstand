import { avgSjokkCount, SjokkRapport } from "@/lib/sjokkRapport";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

type SjokkLevel = "wayLess" | "less" | "normal" | "more" | "wayMore";

const sjokkLevels: Record<SjokkLevel, JSX.Element> = {
  wayLess: <span className={"text-white font-bold"}>under normalt</span>,
  less: <span className={"text-white font-bold"}>noe under normalt</span>,
  normal: <span className={"text-white font-bold"}>sedvanlig</span>,
  more: <span className={"text-white font-bold"}>uvanlig</span>,
  wayMore: <span className={"text-white font-bold"}>ekstremt</span>,
};

const getRelativeShock = (averageSjokk: number, currentSjokk: number) => {
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

export const SjokkSnitt = ({ rapport }: { rapport: SjokkRapport[] }) => {
  const averageSjokk = avgSjokkCount(rapport);
  const currentSjokk = rapport[0].sjokkCount;

  return (
    <div className={"p-6 bg-red text-white"}>
      <h1 className={"text-5xl font-black"}>SJOKKRAPPORT:</h1>
      <h2 className={"text-3xl py-4"}>
        – Dagbladet er{" "}
        <RelativtSjokk level={getRelativeShock(averageSjokk, currentSjokk)} />{" "}
        sjokkert
      </h2>
      <div className={"font-bold"}>
        Ordet «sjokk» forekommer {currentSjokk} ganger på forsiden.
      </div>
      <div>
        Gjennomsnitt (av {rapport.length} målinger siden{" "}
        {format(rapport[rapport.length - 1].timestamp, "dd. MMMM yyyy", {
          locale: nb,
        })}
        ) er {averageSjokk.toFixed(2)}.
      </div>
    </div>
  );
};
