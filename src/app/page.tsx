"use client";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import ExplainSection from "@/containers/landing/ExplainSection";
import RainforestIntro from "@/containers/landing/RainforestSection";
import LastTransactionsSection from "@/containers/landing/LastTransactionsSection";
import PartnerSection from "@/containers/landing/PartnerSection";
import DemoLanding from "@/containers/demo/DemoLanding";
import appConfig from "@/config";
import Footer from "@/components/Footer";
import WhySection from "@/containers/landing/WhySection";
import TrustSection from "@/containers/landing/TrustSection";

export default function Home() {
  if (appConfig.demo) {
    return <DemoLanding />;
  }

  return (
    <main className="flex flex-col items-center">
      <RainforestIntro />

      <WhySection />

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} />

      <TrustSection />

      {/* <ParallaxDivider image={ParallaxBackgrounds.FOREST} />

      <ExplainSection /> */}

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
