"use server";
import { compareDesc, format } from "date-fns";
import * as z from "zod";
import { Readable } from "stream";
import { getRelativeShock, ShockLevel } from "@/app/SjokkSnitt";

const events = require("events");
const readline = require("readline");

// Servers run on UTC, timestamps are Europe/Oslo.
const TIMEZONE_OFFSET = process.env.NODE_ENV === "production" ? 7200 : 0;

const ShockednessSampleSchema = z.object({
  sjokkCount: z.number(),
  sjokk: z.string().array(),
  // In retrospect, using an integer timestamp as opposed to ISO 8601 was not a good idea
  timestamp: z.preprocess(
    (ts) => new Date(((ts as number) + TIMEZONE_OFFSET) * 1000),
    z.date()
  ),
});

export type ShockednessSample = z.infer<typeof ShockednessSampleSchema>;

export type ShockData = {
  newest: ShockednessSample;
  shocks: ShockednessSample[];
  avgShocks: number;
  relativeShock: ShockLevel;
};

const parseShock = (line: string) =>
  ShockednessSampleSchema.parse(JSON.parse(line.replace(/\\n/g, " ")));

const shockURL = process.env.SJOKK_URL as string;

export const shockReport = async (): Promise<ShockData> => {
  const shocks: ShockednessSample[] = [];
  const res = await fetch(
    `${shockURL}?${format(new Date(), "ddMMHHmm").slice(0, -1)}`
  );

  const input = new Readable();
  input.push(await res.text());
  input.push(null); // Signals EOF
  const lineReader = readline.createInterface({ input });

  lineReader.on("line", (line: string) => shocks.push(parseShock(line)));

  // Wait for EOF
  await events.once(lineReader, "close");

  shocks.sort((a, b) => compareDesc(a.timestamp, b.timestamp));
  const avgShocks = avgShockCount(shocks);
  const newest = shocks[0];
  const relativeShock = getRelativeShock(avgShocks, newest.sjokkCount);

  return { shocks, avgShocks, newest, relativeShock };
};

export const avgShockCount = (shocks: ShockednessSample[]) =>
  shocks.map((x) => x.sjokkCount).reduce((x, y) => x + y) / shocks.length;
