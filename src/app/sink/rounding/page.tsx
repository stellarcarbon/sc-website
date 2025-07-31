"use client";

import RoundingFlow from "@/containers/rounding/RoundingFlow";
import { RoundingContextProvider } from "@/context/RoundingContext";

export default function RoundingPage() {
  return (
    <RoundingContextProvider>
      <RoundingFlow />
    </RoundingContextProvider>
  );
}
