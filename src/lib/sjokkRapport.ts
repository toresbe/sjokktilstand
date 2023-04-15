"use server";
import { compareDesc } from "date-fns";
const events = require("events");
const readline = require("readline");

import * as z from "zod";
import { Readable } from "stream";
import { getRelativeShock, SjokkLevel } from "@/app/SjokkSnitt";

const SjokkRapportSchema = z.object({
  sjokkCount: z.number(),
  sjokk: z.string().array(),
  timestamp: z.preprocess((ts) => new Date((ts as number) * 1000), z.date()),
});

export type SjokkRapport = z.infer<typeof SjokkRapportSchema>;

export type SjokkData = {
  newest: SjokkRapport;
  sjokk: SjokkRapport[];
  avgShocks: number;
  relativeShock: SjokkLevel;
};

export const sjokkRapport = async (): Promise<SjokkData> => {
  const sjokk: SjokkRapport[] = [];

  const res = await fetch(process.env.SJOKK_URL as string);

  const input = new Readable();
  input.push(await res.text());
  input.push(null);

  const rl = readline.createInterface({ input });

  rl.on("line", (line: string) => {
    sjokk.push(SjokkRapportSchema.parse(JSON.parse(line.replace(/\\n/g, " "))));
  });

  await events.once(rl, "close");

  sjokk.sort((a, b) => compareDesc(a.timestamp, b.timestamp));
  const sjokkSnitt = avgSjokkCount(sjokk);
  const newest = sjokk[0];
  const relativeShock = getRelativeShock(sjokkSnitt, newest.sjokkCount);
  return { sjokk, avgShocks: sjokkSnitt, newest, relativeShock };
};

export const avgSjokkCount = (sjokkRapport: SjokkRapport[]) => {
  const sjokkCounts = sjokkRapport
    .map((x) => x.sjokkCount)
    .reduce((x, y) => x + y);
  return sjokkCounts / sjokkRapport.length;
};
