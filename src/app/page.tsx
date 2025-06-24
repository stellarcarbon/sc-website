"use client";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import RainforestIntro from "@/containers/landing/RainforestSection";
import LastTransactionsSection from "@/containers/landing/LastTransactionsSection";
import PartnerSection from "@/containers/landing/PartnerSection";
import DemoLanding from "@/containers/demo/DemoLanding";
import appConfig from "@/config";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/containers/landing/HowItWorksSection";
import TrustSection from "@/containers/landing/TrustSection";

export default function Home() {
  if (appConfig.demo) {
    return <DemoLanding />;
  }

  return (
    <main className="flex flex-col items-center">
      <RainforestIntro />

      <HowItWorksSection />

      <TrustSection />

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} />

      <LastTransactionsSection />

      <ParallaxDivider
        image={ParallaxBackgrounds.RIVER_ESTUARY}
        yOffset={-300}
        mirrored
      />

      <PartnerSection />

      <Footer />
    </main>
  );
}
