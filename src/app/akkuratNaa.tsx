"use client";
import Marquee from "react-fast-marquee";

const Tekst = () => <h1 className={"p-4 font-bold text-3xl"}>AKKURAT NÅ</h1>;

export const AkkuratNaa = () => {
  return (
    <Marquee speed={150} gradient={false} className={"h-20"}>
      <Tekst />
      <Tekst />
      <Tekst />
      <Tekst />
      <Tekst />
      <Tekst />
      <Tekst />
      <Tekst />
    </Marquee>
  );
};
