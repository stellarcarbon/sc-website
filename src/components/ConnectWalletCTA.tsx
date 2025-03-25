import { useRouter } from "next/navigation";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ConnectWalletCTA() {
  const router = useRouter();

  return (
    <div
      className="m-4 p-4 
    bg-tertiary text-white border border-accent rounded
    flex items-center gap-2"
    >
      <FontAwesomeIcon icon={faWarning} className="text-[56px]" />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="text-center text-base">
          No wallet connected! To sink CARBON please connect a wallet.
        </div>
        <Button
          onClick={() => router.push("/wallet/connect")}
          className="text-sm"
        >
          Connect wallet
        </Button>
      </div>
    </div>
  );
}
