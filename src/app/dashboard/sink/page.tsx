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
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";

export default function DashboardSink() {
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/transactions"),
    onSwipedRight: () => router.push("/dashboard"),
    delta: 100,
  });

  return (
    <div {...swipeHandlers} className="w-full">
      <div className="my-8 mx-4 flex flex-col items-center gap-2">
        <h1 className="text-3xl">Sink CARBON</h1>
        <span className="text-xs md:text-sm text-center">
          Use this form to sink CARBON to help support the Shipibo Conibo and
          Cacataibo Indigenous Communities
        </span>
      </div>
      <ParallaxDivider
        smallest
        image={ParallaxBackgrounds.RAINFOREST}
        yOffset={-50}
      />
      <SinkForm />
    </div>
  );
}
