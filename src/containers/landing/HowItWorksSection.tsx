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
        {`Supporting nature projects shouldn't be complicated. With Stellarcarbon,
        you can contribute to rainforest conservation projects in just a
        few clicks. Contributions go towards supporting local communities in their efforts to
        maintain & protect the forest.`}
      </Paragraph>
      {/* <Paragraph>
        We do this using by supporting local communities in their efforts to
        maintain & protect the forest.{" "}
      </Paragraph> */}
      <Paragraph>
        Our{" "}
        <SCLink href={"/explain/how-it-works/sinking-process/"}>
          sink CARBON process
        </SCLink>
        {` enables contribution to these goals in a convenient, traceable and secure manner.`}{" "}
      </Paragraph>
      <div className="flex justify-center w-full my-6">
        {/* <CTAButton white text="Connect wallet" /> */}
        <ConnectWalletButton />
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
