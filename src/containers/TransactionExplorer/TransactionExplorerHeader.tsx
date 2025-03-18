import Button from "@/components/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";

export default function TransactionExplorerHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full flex items-center gap-4 h-12 md:h-16 px-4 relative">
      {pathname.includes("detail") ? (
        <>
          <Button
            className="absolute hidden md:block"
            onClick={() => router.push("/transactions/explorer")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <div className="ml-2">Back to explorer</div>
          </Button>

          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-semibold my-2 text-center">
              Transaction
            </h1>
          </div>
        </>
      ) : (
        <h1 className="text-xl md:text-2xl font-semibold my-2 flex-1 text-center">
          Transaction Explorer
        </h1>
      )}
    </header>
  );
}
