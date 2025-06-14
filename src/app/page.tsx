"use client";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import ExplainSection from "@/containers/home/ExplainSection";
import RainforestIntro from "@/containers/home/RainforestSection";
import LastTransactionsSection from "@/containers/home/LastTransactionsSection";
import PartnerSection from "@/containers/home/PartnerSection";
import DemoLanding from "@/containers/demo/DemoLanding";
import appConfig from "@/config";
import Footer from "@/components/Footer";

export default function Home() {
  if (appConfig.demo) {
    return <DemoLanding />;
  }

  return (
    <main className="flex flex-col items-center">
      <RainforestIntro />

      <ExplainSection />

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} yOffset={-100} />

      <LastTransactionsSection />
      <ParallaxDivider
        image={ParallaxBackgrounds.FOREST}
        yOffset={-400}
        mirrored
      />

      <PartnerSection />

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} yOffset={-200} />
      <Footer />

      {/* <div className="h-[600px] flex flex-col justify-center">
        Some other stuff
      </div> */}
    </main>
  );
}
