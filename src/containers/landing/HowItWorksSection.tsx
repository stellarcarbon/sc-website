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
        How it works
      </div>
      <Paragraph>
        {`Supporting climate action shouldn't be complicated. With Stellarcarbon,
        you can contribute to a real, verified biodiversity project in just a
        few clicks — with full transparency and total control.`}
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

  const old = (
    <div className="md:text-xl flex justify-center items-center">
      <div className="flex flex-col gap-6 bg-primary mx-4 p-4 md:p-8 rounded-md shadow-md border border-gray-500">
        {/* <div className="self-center text-3xl">Why?</div> */}
        <div className="flex items-center">
          <div className="w-14 flex justify-center">
            <FontAwesomeIcon icon={faTree} />
          </div>
          <div>Join our effort to preserve rainforests</div>
        </div>
        <div className="flex items-center">
          <div className="w-14 flex justify-center">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>
          <div>Supereasy to contribute using your Stellar wallet</div>
        </div>
        <div className="flex items-center">
          <div className="w-14 flex justify-center">
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
          </div>
          <div>Know exactly where your money is going</div>
        </div>
      </div>
    </div>
  );

  return (
    <LandingSection
      first={first}
      second={second}
      className="border-b-0 !bg-darker"
    ></LandingSection>
  );
}
