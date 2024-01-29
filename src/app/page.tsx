"use client";

import AutumnForestDivider from "@/components/AutumnForestDivider";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import HomeExplainSection from "@/containers/HomeExplainSection";
import LastTransactionsSection from "@/containers/LastTransactionsSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-screen min-h-[1200px] md:min-h-0 md:h-[800px] top-0 left-0 z-0 block absolute" />
      <div className="z-10 relative py-[10vh] text-center max-w-[85%] min-h-[calc(1200px-10vh-80px)] md:min-h-[720px]">
        <h1>
          <span className="text-7xl font-noto">Sinking CARBON</span>
          <br />
          <span className="text-7xl font-noto">with Stellar</span>
        </h1>
        <h2 className="mt-[5vh] uppercase text-2xl tracking-[.4em] font-bold">
          Under development
        </h2>
        <h2 className="mt-[5vh] uppercase text-2xl tracking-[.4em] font-bold">
          Stellar Offsets
        </h2>
        <p className="m-6 leading-8">
          We provide a simple way to make voluntary, negative emissions
          contributions,
          <br /> via high integrity nature based projects on the blockchain.
        </p>
        <p className="m-6 leading-8">
          Each CARBON token represents 1 tonne of carbon dioxide-equivalent
          emissions that have
          <br /> been reduced, avoided, or sequestered by a verified carbon
          offset project, and which will not
          <br /> be released into the atmosphere.
        </p>
      </div>

      <HomeExplainSection />

      <ParallaxDivider image={ParallaxBackgrounds.AUTUMN_FOREST} />

      <LastTransactionsSection />

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} />

      <div className="h-[800px] flex flex-col justify-center">
        Some other stuff
      </div>
    </main>
  );
}
