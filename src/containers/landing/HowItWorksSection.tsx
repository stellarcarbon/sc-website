import Paragraph from "@/components/Paragraph";
import {
  faLightbulb,
  faMoneyCheckDollar,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandingSection from "./LandingSection";
import HowItWorksFlowChart from "./HowItWorksFlowChart";
import SCLink from "@/components/SCLink";

export default function HowItWorksSection() {
  const first = (
    <div>
      <div className="px-4 text-4xl font-bold leading-tight tracking-light mb-2">
        What we do
      </div>
      <Paragraph>
        {`Supporting climate action shouldn't be complicated. With Stellarcarbon,
        you can contribute to verified rainforest conservation project in just a
        few clicks using your Stellar wallet.`}
      </Paragraph>
      <Paragraph>
        {`Whether you're an individual or a small business, you can contribute
        directly to protecting rainforests and natural ecosystems.`}
      </Paragraph>
      <Paragraph>
        Just connect your wallet and start sinking{" "}
        <SCLink href="/dashboard/sink">right now</SCLink>!
        {/* <div className="w-full flex justify-center mt-8">
          <CTAButton white />
        </div> */}
      </Paragraph>

      <Paragraph>
        We also offer API and Sorocarbon integration options for businesses on
        Stellar.
      </Paragraph>
    </div>
  );
  const second = <HowItWorksFlowChart />;

  return (
    <LandingSection
      first={first}
      second={second}
      className="border-b-0 "
    ></LandingSection>
  );
}
