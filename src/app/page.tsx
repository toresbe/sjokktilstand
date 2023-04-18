import { AkkuratNaa } from "@/app/akkuratNaa";
import { ShockPage } from "@/app/ShockPage";
import { shockReport } from "@/lib/shockReport";
import { SubjektKanTaSegEnBolle } from "@/app/akkuratTrans";

export default async function Home() {
  const rapport = await shockReport();

  return (
    <main className="flex min-h-[100dvh] flex-col lg:justify-center bg-black">
      <div className={"bg-red text-white flex-col flex max-lg:grow"}>
        <AkkuratNaa />
        <ShockPage rapport={rapport} />
        <SubjektKanTaSegEnBolle />
      </div>
    </main>
  );
}
