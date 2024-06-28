"use client";

import { useSwipeable } from "react-swipeable";
import CheckoutForm from "../../../components/checkout/CheckoutForm";
import { FormStatusMessages, SinkCarbonXdrPostRequest } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, CarbonService, SinkingResponse } from "@/client";
import FormStatusModal from "@/components/checkout/FormStatusModal";
import { useSCRouter } from "@/app/utils";
import SinkForm from "./SinkForm";

export default function DashboardSink() {
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/transactions"),
    onSwipedRight: () => router.push("/dashboard"),
    delta: 100,
  });

  return (
    <div {...swipeHandlers} className="w-full">
      <SinkForm />
    </div>
  );
}
