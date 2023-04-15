import { AkkuratNaa } from "@/app/akkuratNaa";
import { SjokkSnitt } from "@/app/SjokkSnitt";
import { sjokkRapport } from "@/lib/sjokkRapport";

export default async function Home() {
  const rapport = await sjokkRapport();

  return (
    <main className="flex min-h-screen flex-col justify-center bg-black">
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
