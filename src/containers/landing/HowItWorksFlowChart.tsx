import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake, faWallet } from "@fortawesome/free-solid-svg-icons";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import SCLink from "@/components/SCLink";

export default function HowItWorksFlowChart() {
  return (
    <div className="p-4 py-6 rounded bg-primary border border-accentSecondary mx-4">
      {/* <LandingSectionHeader>How It Works</LandingSectionHeader> */}
      <div className="grid grid-cols-[32px_1fr] gap-x-2 ">
        <FontAwesomeIcon icon={faWallet} className="place-self-center" />
        <div className="text-xl font-bold">Connect Wallet</div>

        <div className="w-[1.5px] bg-gray-500 self-stretch place-self-center"></div>
        <div className="pb-8">Connect your Stellar wallet to the platform.</div>

        {/* <FontAwesomeIcon icon={faCalculator} className="place-self-center" /> */}
        <div className="flex items-center justify-center">
          <CARBONCurrencyIcon width={20} height={20} />
        </div>
        <div className="text-xl font-bold">Determine contribution amount</div>

        <div className="w-[1.5px] bg-gray-500 self-stretch place-self-center"></div>
        <div className="pb-8">
          Decide on a contribution amount, optionally using our emissions
          estimator.
        </div>

        <FontAwesomeIcon icon={faHandshake} className="place-self-center" />
        <div className="text-xl font-bold">Complete the transaction</div>

        <div></div>
        <div className="">
          Finalize the transaction to support the{" "}
          <SCLink href="/explain">rainforest project</SCLink>.
        </div>
      </div>
    </div>
  );
}
