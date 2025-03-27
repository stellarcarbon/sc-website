import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "./Step";

export default function CompletedSinking() {
  return (
    <SinkingStep>
      {/* <span className="text-center md:text-lg">
        {"Success! Return to the dashboard to review your transaction."}
      </span> */}

      <div className="text-3xl text-center">Transaction OK</div>
      <div className="text-center text-sm mt-4">
        Your transaction was succesfully committed to the Stellar blockchain.
      </div>

      <div className="text-center text-sm mt-4">
        Review the transaction on your dashboard!
      </div>
      {/* <Link
        href={
          appConfig.network === WalletNetwork.PUBLIC
            ? `https://stellar.expert/public/tx/${completedTransactionHash}`
            : `https://stellar.expert/testnet/tx/${completedTransactionHash}`
        }
        target="_blank"
        className="text-accentSecondary underline mt-3 text-center"
      >
        View this transaction on Stellar.expert
      </Link> */}
      <div className="flex-1 flex items-center">
        <SuccessIcon />
      </div>
    </SinkingStep>
  );
}
