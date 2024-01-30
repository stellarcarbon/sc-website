import { useEffect, useState, useRef, RefObject } from "react";
import { ServerApi } from "stellar-sdk/lib/horizon";
import { FrontpageTransactionRecord } from "./types";

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): { call: (...args: Parameters<T>) => void; cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const call = (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return { call, cancel };
}

export const useIntersectionObserver = (
  options: IntersectionObserverInit
): [RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

export async function PaymentsPageToFrontPageToTransactionsRecordArray(
  paymentsPage: ServerApi.CollectionPage<
    | ServerApi.PaymentOperationRecord
    | ServerApi.CreateAccountOperationRecord
    | ServerApi.AccountMergeOperationRecord
    | ServerApi.PathPaymentOperationRecord
    | ServerApi.PathPaymentStrictSendOperationRecord
    | ServerApi.InvokeHostFunctionOperationRecord
  >
): Promise<FrontpageTransactionRecord[]> {
  let input = paymentsPage.records;

  console.log(input);
  input.sort((a, b) =>
    Number(a.paging_token) > Number(b.paging_token) ? -1 : 1
  );
  console.log(input);

  const output: FrontpageTransactionRecord[] = await Promise.all(
    input.map(async (payment: any) => {
      const transaction = (await payment.transaction()) as any;

      return {
        pubkey: payment.to,
        createdAt: transaction.created_at,
        memo: transaction.memo,
        sinkAmount: Number(payment.amount),
        id: payment.id,
      };
    })
  );

  return output;
}
