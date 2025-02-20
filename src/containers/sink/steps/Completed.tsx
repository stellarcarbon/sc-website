import SuccessIcon from "@/components/icons/SuccessIcon";
import { useAppContext } from "@/context/appContext";
import {
  SinkingFinalizationSteps,
  useSinkingContext,
} from "@/context/SinkingContext";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { SinkStatusDetails } from "../SinkingFinalization";
import SinkingStep from "./Step";

export default function CompletedSinking() {
  const { appConfig } = useAppContext();
  const { completedTransactionHash } = useSinkingContext();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg">
        {SinkStatusDetails[SinkingFinalizationSteps.COMPLETED].message}
      </span>
      <a
        href={
          appConfig.network === WalletNetwork.PUBLIC
            ? `https://stellar.expert/explorer/public/tx/${completedTransactionHash}`
            : `https://stellar.expert/explorer/testnet/tx/${completedTransactionHash}`
        }
        target="_blank"
        className="text-accentSecondary underline mt-3"
      >
        View this transaction on Stellar.expert
      </a>
      <SuccessIcon />
    </SinkingStep>
  );
}
