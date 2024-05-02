"use client";

import CheckoutForm2 from "./CheckoutForm2";

export default function DashboardSink() {
  return (
    <div className="my-8">
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
