import Button from "@/components/Button";
import {
  faArrowLeft,
  faCircleArrowLeft,
  faInfoCircle,
  faMagnifyingGlass,
  faQuestion,
  faQuestionCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";

export default function TransactionExplorerHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full flex items-center gap-4 h-14 md:h-16 px-3 md:px-4 relative bg-secondary">
      <h1 className="text-xl md:text-2xl font-semibold my-2 text-center ">
        {pathname.includes("detail")
          ? "Transaction details"
          : pathname.includes("help")
          ? "Explorer Help"
          : "Transaction Explorer"}
      </h1>

      {pathname.includes("detail") || pathname.includes("help") ? (
        <TxHeaderButton
          onClick={() => router.back()}
          icon={faCircleArrowLeft}
        />
      ) : (
        <TxHeaderButton
          onClick={() => router.push("/transactions/help")}
          icon={faQuestionCircle}
        />
      )}

      {/* <div className="absolute right-3">
        <TButton onClick={() => {}} icon={faInfoCircle}></TButton>
      </div> */}
    </header>
  );
}

function TxHeaderButton({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: IconDefinition;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute right-5 text-2xl md:hover:text-accentSecondary"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

function TButton({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon: IconDefinition;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1 bg-accent rounded shadow-md text-black"
    >
      <FontAwesomeIcon icon={icon} />
      <div>Help</div>
    </button>
  );
}
