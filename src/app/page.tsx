import { AkkuratNaa } from "@/app/akkuratNaa";
import { SjokkLevel, SjokkSnitt } from "@/app/SjokkSnitt";
import { sjokkRapport } from "@/lib/sjokkRapport";
import Head from "next/head";

const RelativeSjokk: Record<SjokkLevel, string> = {
  less: "Dagbladet er under snittet sjokkert",
  more: "Dagbladet er over snittet sjokkert",
  normal: "Dagbladet er rundt normalt sjokkert",
  wayLess: "Dagbladet er uvanlig lite sjokkert",
  wayMore: "Dagbladet er veldig sjokkert",
};

export default async function Home() {
  const rapport = await sjokkRapport();

  return (
    <main className="flex min-h-screen flex-col justify-center bg-black">
      <Head>
        <title>Sjokktilstand</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@toresbe" />
        <meta name="twitter:title" content="Sjokktilstand" />
        <meta
          name="twitter:description"
          content={RelativeSjokk[rapport.relativeShock]}
        />
        <meta name="twitter:image" content="URL_FOR_YOUR_IMAGE" />
      </Head>
      <div className={"bg-yellow"}>
        <AkkuratNaa />
        <div className={"bg-red flex justify-center"}>
          <SjokkSnitt rapport={rapport} />
        </div>
        <AkkuratNaa />
      </div>
    </main>
  );
}
