"use server";
import { compareDesc, format } from "date-fns";
const events = require("events");
const readline = require("readline");

import * as z from "zod";
import { Readable } from "stream";
import { getRelativeShock, SjokkLevel } from "@/app/SjokkSnitt";

// Servers run on UTC, timestamps are Europe/Oslo.
const TIMEZONE_OFFSET = process.env.NODE_ENV === "production" ? 7200 : 0;

const SjokkRapportSchema = z.object({
  sjokkCount: z.number(),
  sjokk: z.string().array(),
  // In retrospect, using an integer timestamp as opposed to ISO 8601 was not a good idea.
  timestamp: z.preprocess(
    (ts) => new Date(((ts as number) + TIMEZONE_OFFSET) * 1000),
    z.date()
  ),
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
  const res = await fetch(
    (process.env.SJOKK_URL as string) +
      `?${format(new Date(), "ddMMHHmm").slice(0, -1)}`
  );

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
