import { AkkuratNaa } from "@/app/akkuratNaa";
import { SjokkSnitt } from "@/app/SjokkSnitt";
import { sjokkRapport } from "@/lib/sjokkRapport";

export default async function Home() {
  const rapport = await sjokkRapport();

  return (
    <main className="flex min-h-screen flex-col bg-yellow">
      <AkkuratNaa />
      <SjokkSnitt rapport={rapport} />
    </main>
  );
}
