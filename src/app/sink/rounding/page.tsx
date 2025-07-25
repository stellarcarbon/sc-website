"use client";

import RoundingFlow from "@/containers/rounding/RoundingFlow";
import { RoundingContextProvider } from "@/context/RoundingContext";
import { SEP10ContextProvider } from "@/context/SEP10Context";

export default function RoundingPage() {
  return (
    <RoundingContextProvider>
      <RoundingFlow />
    </RoundingContextProvider>
  );
}
