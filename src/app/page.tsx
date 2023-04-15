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
        <meta
          name="description"
          content="Oppdatert oversikt over Dagbladets sjokktilstand"
        />
        <meta property="og:url" content="https://sjokktilstand.gunkies.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sjokktilstand" />
        <meta
          property="og:description"
          content={RelativeSjokk[rapport.relativeShock]}
        />
        <meta
          property="og:image"
          content="https://sjokktilstand.gunkies.org/sjokk.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="sjokktilstand.gunkies.org" />
        <meta
          property="twitter:url"
          content="https://sjokktilstand.gunkies.org/"
        />
        <meta name="twitter:title" content="Sjokktilstand" />
        <meta
          name="twitter:description"
          content={RelativeSjokk[rapport.relativeShock]}
        />
        <meta
          name="twitter:image"
          content="https://sjokktilstand.gunkies.org/sjokk.png"
        />
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
