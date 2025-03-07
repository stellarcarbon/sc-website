import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { useTransactionExplorerContext } from "@/context/TransactionExplorerContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";

export default function TransactionExplorerHeader() {
  const { goToNextPage, goToPreviousPage } = useTransactionExplorerContext();

  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full flex items-center gap-4 my-2 px-4">
      {pathname.includes("detail") ? (
        <>
          <IconButton onClick={() => router.push("/transactions/explorer")}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
          <h1 className="text-2xl font-semibold my-2 text-center">
            Transaction Detail
          </h1>
        </>
      ) : (
        <h1 className="text-2xl font-semibold my-2 flex-1 text-center">
          Transaction Explorer
        </h1>
      )}
    </header>
  );
}
