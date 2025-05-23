"use client";

import { useCallback, useState } from "react";
import AirportInput, { AirportOption } from "../demo/AirportInput";
import { CabinClass, EstimateService, FlightEstimateResponse } from "@/client";
import Select from "react-select";
import Button from "@/components/Button";
import FlightEstimateTable from "../demo/emissions/FlightEstimateTable";
import { Blocks } from "react-loader-spinner";
import EstimatorResult from "./EstimatorResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalculator } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function FlightEstimator() {
  const [departureAirport, setDepartureAirport] =
    useState<AirportOption | null>(null);
  const [destinationAirport, setDestinationAirport] =
    useState<AirportOption | null>(null);
  const [cabinClass, setCabinClass] = useState<CabinClass>(
    cabinClassOptions[0].value
  );
  const [tripType, setTripType] = useState<TripType>(tripTypeOptions[1].value);
  const [flightEstimate, setFlightEstimate] =
    useState<FlightEstimateResponse>();

  const [deparatureError, setDepartureError] = useState<string>();
  const [destinationError, setDestinationError] = useState<string>();
  const [error, setError] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const estimateEmissions = useCallback(() => {
    if (departureAirport === null) {
      setDepartureError("You must choose a departure airport.");
    } else {
      setDepartureError(undefined);
    }

    if (destinationAirport === null) {
      setDestinationError("You must choose a destination airport.");
    } else {
      setDestinationError(undefined);
    }

    if (departureAirport === null || destinationAirport === null) {
      return;
    }

    setIsLoading(true);

    EstimateService.getFlightEstimate({
      departure: departureAirport!.value,
      destination: destinationAirport!.value,
      cabinClass: cabinClass,
      tripType: tripType,
    }).then((response) => {
      setFlightEstimate(response);
      setIsLoading(false);
    });
  }, [departureAirport, destinationAirport, cabinClass, tripType]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center p-8">
          <Blocks />
        </div>
      ) : flightEstimate ? (
        <EstimatorResult
          estimate={flightEstimate}
          tripType={tripType}
          cabinClass={cabinClass}
          refresh={() => setFlightEstimate(undefined)}
        />
      ) : (
        <>
          {/* Intro */}
          <div className="flex flex-col gap-2 my-2 mt-3">
            <h1 className="text-2xl">Estimate your flight emissions</h1>
            <div className="">
              Use this tool to help estimate the amount of carbon emitted in
              your flight.
            </div>
          </div>

          {/* Formfields */}
          <div className="flex flex-col my-8 bg-primary p-4 rounded border border-gray-600">
            <FormField
              title="Departure"
              helpText="The airport your flight departed from."
              input={
                <AirportInput
                  instanceId="departure-select"
                  setOption={setDepartureAirport}
                />
              }
              error={deparatureError}
            />

            <FormField
              title="Destination"
              helpText="The airport your flight landed on."
              input={
                <AirportInput
                  instanceId="destination-select"
                  setOption={setDestinationAirport}
                />
              }
              error={destinationError}
            />

            <FormField
              title="Cabin class"
              helpText="Which cabin class did you fly?"
              input={
                <Select
                  instanceId="cabinclass-select"
                  options={cabinClassOptions}
                  defaultValue={cabinClassOptions[0]}
                  onChange={(option) => {
                    if (option !== null) setCabinClass(option.value);
                  }}
                  className="text-black"
                />
              }
            />

            <FormField
              title="Trip"
              helpText="Round trip or just a one way flight?"
              input={
                <Select
                  instanceId="trip-select"
                  options={tripTypeOptions}
                  defaultValue={tripTypeOptions[1]}
                  onChange={(option) => {
                    if (option !== null) setTripType(option.value);
                  }}
                  className="text-black"
                />
              }
            />

            <div className="self-center">
              <Button onClick={estimateEmissions}>
                <FontAwesomeIcon icon={faCalculator} />
                <div>Estimate emissions</div>
              </Button>
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-center">
            {/* <Button onClick={estimateEmissions}>
              <FontAwesomeIcon icon={faCalculator} />
              <div>Estimate emissions</div>
            </Button>
            <hr className="w-[90%] my-4 border-1 border-accentSecondary" /> */}
            <Button onClick={() => router.push("/dashboard/sink")}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <div>Return to sink form</div>
            </Button>
          </div>
        </>
      )}
    </>
  );
}

const cabinClassOptions = Object.values(CabinClass).map((cabinClass) => {
  return {
    value: cabinClass,
    label: cabinClass,
  };
});

export enum TripType {
  ONEWAY = "one-way",
  ROUNDTRIP = "round-trip",
}

const tripTypeOptions = Object.values(TripType).map((tripType) => {
  return { value: tripType, label: tripType };
});

interface FormFieldProps {
  title: string;
  helpText: string;
  input: React.ReactElement;
  error?: string;
}

function FormField({ title, helpText, input, error }: FormFieldProps) {
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-xs mb-1">{helpText}</span>
      {input}
      {error ? (
        <div className="text-xs h-6 inline-flex items-center text-red-500">
          {error}
        </div>
      ) : (
        <div className="h-6"></div>
      )}
    </div>
  );
}
