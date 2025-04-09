import { useRouter } from "next/navigation";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ConnectWalletCTA() {
  const router = useRouter();

  return (
    <div
      className="my-8 p-4 mx-4
    bg-darkest text-white border border-accentSecondary rounded
 
    flex flex-col items-center justify-center gap-4"
    >
      <div className="flex-1 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faWarning}
          className="text-[36px] md:text-[56px]"
        />
        <div className="text-center text-sm md:text-base">
          No wallet connected! To sink CARBON please connect a wallet.
        </div>
      </div>

      <button
        onClick={() => router.push("/wallet/connect")}
        className="text-sm bg-accent text-black px-4 rounded shadow h-8 flex items-center gap-1"
      >
        <FontAwesomeIcon icon={faLink} />
        Connect wallet
      </button>
    </div>
  );
}
