import { useRouter } from "next/navigation";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ConnectWalletCTA() {
  const router = useRouter();

  return (
    <div
      className="my-8 p-4 mx-4
    bg-secondary text-white border border-accentSecondary rounded
      md:w-[80%]
    flex flex-col items-center justify-center gap-4"
    >
      <div className="flex-1 flex items-center gap-2 w-full">
        <FontAwesomeIcon
          icon={faWarning}
          className="text-[36px] md:text-[56px]"
        />

        <div className="flex-1 text-center text-sm md:text-base px-2">
          No wallet connected! {`Let's`} connect your wallet first to continue.
        </div>
      </div>

      <Button onClick={() => router.push("/connect")}>
        <FontAwesomeIcon icon={faLink} />
        <div>Connect wallet</div>
      </Button>
    </div>
  );
}
