"use client";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import ExplainSection from "@/containers/home/ExplainSection";
import RainforestIntro from "@/containers/home/RainforestSection";
import LastTransactionsSection from "@/containers/home/LastTransactionsSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <RainforestIntro />

      <ExplainSection />

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} />

      <LastTransactionsSection />
      <ParallaxDivider image={ParallaxBackgrounds.LAFAYETTE} />

      <div className="h-[800px] flex flex-col justify-center">
        Some other stuff
      </div>

      <ParallaxDivider image={ParallaxBackgrounds.AUTUMN_FOREST} />
    </main>
  );
}
