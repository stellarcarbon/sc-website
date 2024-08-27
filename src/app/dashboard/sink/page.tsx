"use client";

import { useSwipeable } from "react-swipeable";
import CheckoutForm from "../../../components/checkout/CheckoutForm";
import { SinkCarbonXdrPostRequest } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { useCallback } from "react";
import { useSCRouter } from "@/app/utils";

export default function SinkFormPage() {
  const { walletConnection, setSinkRequest } = useAppContext();

  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/transactions"),
    onSwipedRight: () => router.push("/dashboard"),
    delta: 100,
  });

  const initSubmitSinkingTransaction = useCallback(
    async (sinkRequest: SinkCarbonXdrPostRequest, quote: number) => {
      if (!walletConnection?.isAnonymous) {
        sinkRequest.email = walletConnection?.personalDetails?.useremail;
      }

      setSinkRequest(sinkRequest);
      router.push("/sink");
      return;
    },
    [walletConnection, setSinkRequest, router]
  );

  return (
    <div {...swipeHandlers} className="w-full">
      <CheckoutForm submitSinkingTransaction={initSubmitSinkingTransaction} />
    </div>
  );
}
