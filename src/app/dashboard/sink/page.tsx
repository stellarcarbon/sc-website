"use client";

import { useSwipeable } from "react-swipeable";
import CheckoutForm2 from "./CheckoutForm2";
import { useRouter } from "next/navigation";

export default function DashboardSink() {
  const router = useRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/transactions"),
    onSwipedRight: () => router.push("/dashboard"),
    delta: 100,
  });

  return (
    <div {...swipeHandlers} className="py-8">
      {/* Welkom blok */}
      <div className="flex flex-col m-2 mb-8">
        <span className="text-xl self-center">Sink CARBON</span>
        <span className="text-xs mt-1 text-center">
          Use this form to create a sinking transaction.
        </span>
      </div>
      <CheckoutForm2 doCheckoutFlow={() => {}} />
    </div>
  );
}
