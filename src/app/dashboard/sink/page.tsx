"use client";

import { useSwipeable } from "react-swipeable";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useSCRouter } from "@/utils";

export default function SinkFormPage() {
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/transactions"),
    onSwipedRight: () => router.push("/dashboard"),
    delta: 100,
  });

  return (
    <div {...swipeHandlers} className="w-full">
      <CheckoutForm />
    </div>
  );
}
