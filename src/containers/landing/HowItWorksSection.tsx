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
import Subheader from "@/components/Subheader";
import CTAButton from "@/components/CTAButton";
import { ConnectWalletButton } from "@/components/ConnectWalletCTA";

export default function HowItWorksSection() {
  const first = (
    <div>
      <div className="px-4 text-4xl font-bold leading-tight tracking-light mb-2">
        What is Stellarcarbon?
      </div>
      <Paragraph>
        {`With Stellarcarbon, you can contribute to rainforest conservation projects in just a
        few clicks. Your contribution directly finances the supporting of local communities in their efforts to
        maintain & protect the forest.`}
      </Paragraph>
      {/* <Paragraph>
        We do this using by supporting local communities in their efforts to
        maintain & protect the forest.{" "}
      </Paragraph> */}
      <div className="ml-4 text-2xl font-bold leading-tight mb-2">
        Sink CARBON
      </div>
      <Paragraph>
        {/* Stellarcarbon enables contribution to these goals in a convenient,
        traceable and secure manner, via our blockchain inspired{" "}
        <SCLink href="/">sinking process</SCLink>. */}
        Stellarcarbon uses Stellar blockchain transactions to make your
        contributions convenient, traceable and secure. A process we call
        sinking CARBON.
      </Paragraph>
      <div className="flex justify-center w-full mt-2 mb-6">
        <CTAButton white text="Start sinking" />
        {/* <ConnectWalletButton /> */}
      </div>
      {/* <Paragraph>
        For businesses on Stellar we offer API and Sorocarbon integration
        options.
      </Paragraph> */}
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
