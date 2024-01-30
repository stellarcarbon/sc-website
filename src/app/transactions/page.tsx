"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Server, ServerApi } from "stellar-sdk/lib/horizon";
import { CARBON_SINK_ACCOUNT, FrontpageTransactionRecord } from "../types";
import { PaymentsPageToFrontPageToTransactionsRecordArray } from "../utils";
import Button from "@/components/Button";
import FormError from "@/components/FormError";

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [transactions, setTransactions] = useState<
    FrontpageTransactionRecord[]
  >([]);
  const [currentPage, setCurrentPage] =
    useState<
      ServerApi.CollectionPage<
        | ServerApi.PaymentOperationRecord
        | ServerApi.CreateAccountOperationRecord
        | ServerApi.AccountMergeOperationRecord
        | ServerApi.PathPaymentOperationRecord
        | ServerApi.PathPaymentStrictSendOperationRecord
        | ServerApi.InvokeHostFunctionOperationRecord
      >
    >();

  const [paginationError, setPaginationError] = useState<string>();
  const [reverse, setReverse] = useState<boolean>(false);

  const fetchPayments = async (
    limit: number,
    order: "asc" | "desc",
    cursor?: string
  ) => {
    try {
      const horizonServer = new Server("https://horizon.stellar.org");
      let request = horizonServer
        .payments()
        .forAccount(CARBON_SINK_ACCOUNT)
        .limit(limit)
        .order(order ?? "desc");

      if (cursor) {
        request = request.cursor(cursor);
      }

      const paymentsPage = await request.call();
      const enrichedPayments =
        await PaymentsPageToFrontPageToTransactionsRecordArray(paymentsPage);

      setTransactions(enrichedPayments);
      setCurrentPage(paymentsPage);
      updateParams(order, enrichedPayments[0]?.id, limit);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const updateParams = (
    order: "asc" | "desc",
    cursor: string | undefined,
    limit?: number
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (typeof cursor === "string") {
      currentParams.set("cursor", cursor);
    }
    currentParams.set("order", order);
    if (limit) {
      currentParams.set("limit", limit.toString());
    }

    router.replace(`?${currentParams}`, { scroll: false });
  };

  const goToNextPage = async () => {
    setPaginationError(undefined);
    if (currentPage) {
      const nextPage =
        searchParams.get("order") === "asc"
          ? await currentPage.prev()
          : await currentPage.next();

      const newCursor = transactions?.slice(-1)[0]?.id; // Last transaction is the cursor

      const enrichedPayments =
        await PaymentsPageToFrontPageToTransactionsRecordArray(nextPage);

      if (enrichedPayments.length === 0) {
        setPaginationError("No more transactions on next page.");
      } else {
        setCurrentPage(nextPage);
        setTransactions(enrichedPayments);

        updateParams("desc", newCursor);
      }
    }
    setReverse(false);
  };

  const goToPreviousPage = async () => {
    setPaginationError(undefined);
    if (currentPage) {
      const prevPage =
        searchParams.get("order") === "asc"
          ? await currentPage.next()
          : await currentPage.prev();

      const newCursor = transactions[0]?.id; // First transaction is the cursor
      const enrichedPayments =
        await PaymentsPageToFrontPageToTransactionsRecordArray(prevPage);

      if (enrichedPayments.length === 0) {
        setPaginationError("No more transactions on previous page.");
      } else {
        setCurrentPage(prevPage);
        setTransactions(enrichedPayments);

        updateParams("asc", newCursor);
      }
    }
    setReverse(true);
  };

  useEffect(() => {
    const limit = Number(searchParams.get("limit") ?? "5");
    const cursor = searchParams.get("cursor") ?? undefined;
    const order = (searchParams.get("order") ?? "desc") as "asc" | "desc";

    fetchPayments(limit, order, cursor);
  }, []);

  return (
    <main className="flex flex-col font-noto blockchain-bg bg-no-repeat bg-fixed bg-cover min-h-[calc(100vh-176px)]">
      <div className="w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[4vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            Stellarcarbon Ledger
          </span>
        </div>
      </div>

      <div className="mb-32 p-4 md:p-16 py-16 flex flex-col md:max-w-[1080px] md:mx-auto bg-secondary rounded-md">
        <h2 className="text-2xl">Transaction history</h2>
        <hr className="my-8 w-[100px] border-2 border-accentSecondary" />
        <div className="tracking-wide leading-7">
          <p>
            Here you can find the complete history of transactions using
            Stellarcarbon.
          </p>
          <p>
            In ut eros pretium velit congue fringilla. Fusce id commodo nibh.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nullam viverra fringilla purus, ac
            pellentesque nulla luctus id. Mauris in nisl sapien. Aliquam felis
            libero, blandit id feugiat et, placerat nec tortor. Aliquam egestas
            nunc et pellentesque auctor.
          </p>
        </div>

        <div className="self-center max-w-full">
          {transactions ? (
            transactions.map((tx, idx) => {
              return (
                <a
                  key={`tx_${idx}`}
                  href={`https://stellar.expert/explorer/public/tx/${tx.id}`}
                  target="_blank"
                  className="flex flex-col text-sm bg-primary rounded-md border border-accentSecondary p-2 w-full self-center md:self-start md:max-w-[40vw]"
                >
                  <div className="flex justify-start items-center">
                    <span className="w-28 md:w-32">Transaction ID</span>
                    <span className=" truncate max-w-[60%]">{tx.id}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-28 md:w-32">Account</span>
                    <span className=" truncate max-w-[60%]">{tx.pubkey}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-28 md:w-32">Date</span>
                    <span className="">
                      {new Date(tx.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-28 md:w-32">Sinked</span>

                    <span className="">{tx.sinkAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-start items-center">
                    <span className="w-28 md:w-32">Memo</span>

                    <span className=" truncate max-w-[60%]">{tx.memo}</span>
                  </div>
                </a>
              );
            })
          ) : (
            <div>Loading</div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-4">
            <Button onClick={goToPreviousPage}>Previous</Button>
            <Button onClick={goToNextPage}>Next</Button>
          </div>
          {paginationError && <FormError>{paginationError}</FormError>}
        </div>
      </div>
    </main>
  );
}
