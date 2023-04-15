import { AkkuratNaa } from "@/app/akkuratNaa";
import { SjokkLevel, SjokkSnitt } from "@/app/SjokkSnitt";
import { sjokkRapport } from "@/lib/sjokkRapport";

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
    <main className="flex min-h-screen flex-col lg:justify-center bg-black">
      <div className={"bg-red text-white flex-col flex max-md:grow"}>
        <AkkuratNaa />
        <SjokkSnitt rapport={rapport} />
        <AkkuratNaa />
      </div>
    </main>
  );
}
