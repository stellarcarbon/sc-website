"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* 
TODO: do not cheat React by disabling exhaustive deps. 

Not very important, but nice programming challenge.

https://overreacted.io/a-complete-guide-to-useeffect/

*/

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CARBON_SINK_ACCOUNT, FrontpageTransactionRecord } from "../types";
import { Server, ServerApi } from "stellar-sdk/lib/horizon";
import { PaymentsPageToFrontPageToTransactionsRecordArray } from "../utils";
import Button from "@/components/Button";
import FormError from "@/components/FormError";

export default function AllTransactions() {
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

  const updateParams = useCallback(
    (order: "asc" | "desc", cursor: string | undefined, limit?: number) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      if (typeof cursor === "string") {
        currentParams.set("cursor", cursor);
      }
      currentParams.set("order", order);
      if (limit) {
        currentParams.set("limit", limit.toString());
      }

      router.replace(`?${currentParams}`, { scroll: false });
    },
    [router]
  );

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
  };

  const fetchPayments = useCallback(
    // async (limit: number, order: "asc" | "desc", cursor?: string) => {
    async () => {
      const limit = Number(searchParams.get("limit") ?? "5");
      const cursor = searchParams.get("cursor") ?? undefined;
      const order = (searchParams.get("order") ?? "desc") as "asc" | "desc";

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
    },
    []
  );

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        {transactions.length > 0 ? (
          transactions.map((tx, idx) => {
            return (
              <a
                key={`tx_${idx}`}
                href={`https://stellar.expert/explorer/public/tx/${tx.id}`}
                target="_blank"
                className="flex flex-col p-2 w-full lg:w-[80%] text-sm bg-primary rounded-md border border-accentSecondary"
              >
                <div className="grid grid-cols-4">
                  <span className="">TX Hash</span>
                  <span className="truncate col-span-3">{tx.hash}</span>
                </div>

                <div className="grid grid-cols-4">
                  <span className="">Account</span>
                  <span className="truncate col-span-3">{tx.pubkey}</span>
                </div>
                <div className="grid grid-cols-4">
                  <span className="">Date</span>
                  <span className="col-span-3">
                    {new Date(tx.createdAt).toDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-4">
                  <span className="">Sunk</span>

                  <span className="grow col-span-3">
                    {tx.sinkAmount?.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4">
                  <span className="">Memo</span>

                  <span className="truncate col-span-3">{tx.memo}</span>
                </div>
              </a>
            );
          })
        ) : (
          <div>Loading transactions...</div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex gap-4">
          <Button onClick={goToPreviousPage}>Previous</Button>
          <Button onClick={goToNextPage}>Next</Button>
        </div>
        {paginationError && <FormError>{paginationError}</FormError>}
      </div>
    </>
  );
}
