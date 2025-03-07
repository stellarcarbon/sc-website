import Button from "@/components/Button";
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
          <Button
            onClick={() => router.push("/transactions/explorer")}
            className="cursor-pointer text-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <h1 className="text-2xl font-semibold my-2 text-center">
            Transaction Detail
          </h1>
        </>
      ) : (
        <h1 className="text-2xl font-semibold my-2 flex-1 text-center">
          Transaction Explorer
        </h1>
      )}

      {/* <h1 className="text-2xl font-semibold my-2 text-center">
        {!pathname.includes("detail")
          ? "Transaction Explorer"
          : "Transaction Detail"}
      </h1> */}
      {/* {!pathname.includes("detail") ? (
        <div className="w-full flex justify-between items-center gap-1 my-2 px-4 !text-xs">
          <Button onClick={goToPreviousPage}>Previous page</Button>
          <Button onClick={() => router.push("/transactions/explorer")}>
            Go back to start
          </Button>
          <Button onClick={goToNextPage}>Next page</Button>
        </div>
      ) : (
        <Button
          onClick={() => router.push("/transactions/explorer")}
          className="cursor-pointer text-sm"
        >
          Back to explorer
        </Button>
      )} */}
    </header>
  );
}
