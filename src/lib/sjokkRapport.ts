"use server";
import { compareDesc } from "date-fns";
const events = require("events");
const readline = require("readline");

import * as z from "zod";
import * as https from "https";

const SjokkRapportSchema = z.object({
  sjokkCount: z.number(),
  sjokk: z.string().array(),
  timestamp: z.preprocess((ts) => new Date((ts as number) * 1000), z.date()),
});

export type SjokkRapport = z.infer<typeof SjokkRapportSchema>;

export const sjokkRapport = async (): Promise<SjokkRapport[]> => {
  const sjokk: SjokkRapport[] = [];

  await new Promise((resolve) =>
    https.get(
      "https://simula.frikanalen.no/~toresbe/dagbladet-sjokk",
      async (input) => {
        const rl = readline.createInterface({ input });

        rl.on("line", (line: string) => {
          sjokk.push(
            SjokkRapportSchema.parse(JSON.parse(line.replace(/\\n/g, " ")))
          );
        });

        await events.once(rl, "close");
        resolve();
      }
    )
  );

  sjokk.sort((a, b) => compareDesc(a.timestamp, b.timestamp));

  return sjokk;
};

export const avgSjokkCount = (sjokkRapport: SjokkRapport[]) => {
  const sjokkCounts = sjokkRapport
    .map((x) => x.sjokkCount)
    .reduce((x, y) => x + y);
  return sjokkCounts / sjokkRapport.length;
};
