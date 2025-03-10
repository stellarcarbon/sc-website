import SuccessIcon from "@/components/icons/SuccessIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import SinkingStep from "./Step";
import appConfig from "@/config";

export default function CompletedSinking() {
  const { completedTransactionHash } = useSinkingContext();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg">
        {"Success! Check out the link below to view your transaction."}
      </span>
      <a
        href={
          appConfig.network === WalletNetwork.PUBLIC
            ? `https://stellar.expert/explorer/public/tx/${completedTransactionHash}`
            : `https://stellar.expert/explorer/testnet/tx/${completedTransactionHash}`
        }
        target="_blank"
        className="text-accentSecondary underline mt-3 text-center"
      >
        View this transaction on Stellar.expert
      </a>
      <SuccessIcon />
    </SinkingStep>
  );
}
