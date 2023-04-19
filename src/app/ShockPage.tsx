import {
  getRelativeShock,
  ShockData,
  ShockednessSample,
  ShockLevel,
} from "@/lib/shockReport";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

const ShockLevelElement: Record<ShockLevel, JSX.Element> = {
  not: <span className={"text-red font-bold"}>overhodet ikke</span>,
  wayLess: <span className={"text-red font-bold"}>under normalt</span>,
  less: <span className={"text-red font-bold"}>noe under normalt</span>,
  normal: <span className={"text-red font-bold"}>normalt</span>,
  more: <span className={"text-red font-bold"}>uvanlig</span>,
  wayMore: <span className={"text-red font-bold"}>ekstremt</span>,
};

const ShockLevel = ({ level }: { level: ShockLevel }) => (
  <h2 className={"text-xl sm:text-3xl"}>
    – Dagbladet er {ShockLevelElement[level]} sjokkert:
  </h2>
);

function ShockList({ newest }: { newest: ShockednessSample }) {
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

function ShockNumbers({
  rapport: { newest, shocks, avgShocks },
}: {
  rapport: ShockData;
}) {
  return (
    <div className={"space-y-2"}>
      <h3 className={"text-2xl font-bold pb-1"}>Se sjokktallene:</h3>
      <div>
        Ordet «sjokk» (eller «rystet»/«rystende»!) forekommer{" "}
        {newest.sjokkCount === 1 ? "bare " : ""}
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

export const ShockPage = ({ rapport }: { rapport: ShockData }) => {
  const { newest, avgShocks } = rapport;
  return (
    <div className={"bg-yellow text-black max-lg:flex-grow"}>
      <div
        className={"lg:mx-auto w-full max-w-2xl p-4 lg:p-12 h-max space-y-4"}
      >
        <h1 className={"text-3xl sm:text-5xl font-black"}>SJOKKRAPPORT:</h1>
        <ShockLevel level={getRelativeShock(avgShocks, newest.sjokkCount)} />
        <ShockList newest={newest} />
        <ShockNumbers rapport={rapport} />
      </div>
    </div>
  );
};
