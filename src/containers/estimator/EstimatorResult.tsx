import { CabinClass, FlightEstimateResponse } from "@/client";
import { PropsWithChildren } from "react";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faContactCard,
  faFileContract,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { TripType } from "./FlightEstimator";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function EstimatorResult({
  estimate,
  tripType,
  cabinClass,
  refresh,
}: {
  estimate: FlightEstimateResponse;
  tripType: TripType;
  cabinClass: CabinClass;
  refresh: () => void;
}) {
  const { overrideFormValues } = useSinkFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full grid grid-cols-3 gap-y-0">
        <EstimatorKey>Departure</EstimatorKey>
        <EstimatorValue>{estimate.departure_name}</EstimatorValue>

        <EstimatorKey>Destination</EstimatorKey>
        <EstimatorValue>{estimate.destination_name}</EstimatorValue>

        <EstimatorKey>Round trip?</EstimatorKey>
        <EstimatorValue>
          {tripType === "round-trip" ? "Yes" : "No"}
        </EstimatorValue>

        <EstimatorKey>Cabin class</EstimatorKey>
        <EstimatorValue>{cabinClass}</EstimatorValue>
      </div>

      <div className="bg-primary rounded border border-accentSecondary mt-3 p-6 flex flex-col items-center gap-4">
        <div className="">Distance flown</div>
        <div className="flex items-center gap-2 text-[32px] my-1">
          <div>{estimate && Number(estimate.distance_km).toFixed(0)}</div>
          <div>kilometers</div>
        </div>

        <div className="text-base">Estimated CO2 emissions</div>
        <div className="flex items-center gap-2 text-[32px] my-1">
          <div>{estimate.co2_tonnes}</div>
          <div>tonnes</div>
        </div>

        <div className="text-center">
          To compensate these emissions you need to sink
        </div>
        <div className="my-1 text-[56px] inline-flex items-center gap-4 justify-center w-full">
          {estimate.co2_tonnes}
          <CARBONCurrencyIcon className="inline" width={48} height={48} />
        </div>

        <div className="flex flex-col gap-4 items-center mt-4">
          <Button
            onClick={() =>
              overrideFormValues(
                "✈️ air travel",
                Number(estimate.co2_tonnes),
                undefined
              )
            }
          >
            <FontAwesomeIcon icon={faFileContract} />
            <div>Continue to sink form</div>
          </Button>
        </div>
      </div>
    </div>
  );
}

function EstimatorKey({ children }: PropsWithChildren) {
  return <div className="col-span-1">{children}</div>;
}

function EstimatorValue({ children }: PropsWithChildren) {
  return (
    <div className="col-span-2 inline-flex items-center justify-end text-end">
      {children}
    </div>
  );
}
