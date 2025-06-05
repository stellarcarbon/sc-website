import { useRouter } from "next/navigation";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ConnectWalletCTA() {
  const router = useRouter();

  return (
    <div
      className="my-8 p-4 mx-4
    bg-primary text-white border border-accentSecondary rounded
      md:max-w-[80%]
    flex flex-col items-center justify-center gap-4"
    >
      <div className="flex-1 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faWarning}
          className="text-[36px] md:text-[56px]"
        />

        <div className="mt-2 w-full">
          <div className="text-center text-sm md:text-base">
            No wallet connected! Lets connect your wallet first to continue.
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.push("/connect")}
        className="h-10 text-base"
      >
        <FontAwesomeIcon icon={faLink} />
        <div>Connect wallet</div>
      </Button>
    </div>
  );
}
