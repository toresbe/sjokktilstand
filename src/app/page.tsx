import { AkkuratNaa } from "@/app/akkuratNaa";
import { SjokkSnitt } from "@/app/SjokkSnitt";
import { shockReport } from "@/lib/shockReport";

export default async function Home() {
  const rapport = await shockReport();

  return (
    <main className="flex min-h-screen flex-col lg:justify-center bg-black">
      <div className={"bg-red text-white flex-col flex max-lg:grow"}>
        <AkkuratNaa />
        <SjokkSnitt rapport={rapport} />
        <AkkuratNaa />
      </div>
    </main>
  );
}
