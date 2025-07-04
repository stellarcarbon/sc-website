"use client";

import { CabinClass, EstimateService, FlightEstimateResponse } from "@/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import AirportInput, { AirportOption } from "./AirportInput";
import Select from "react-select";
import Button from "@/components/Button";
import FlightEstimateTable from "./emissions/FlightEstimateTable";

interface FormFieldProps {
  title: string;
  helpText: string;
  input: React.ReactElement;
}

enum TripType {
  ONEWAY = "one-way",
  ROUNDTRIP = "round-trip",
}

function FormField({ title, helpText, input }: FormFieldProps) {
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-xs mb-1">{helpText}</span>
      {input}
    </div>
  );
}

export default function EmissionsCalculator() {
  const router = useRouter();

  const cabinClassOptions = Object.values(CabinClass).map((cabinClass) => {
    return {
      value: cabinClass,
      label: cabinClass,
    };
  });

  const tripTypeOptions = Object.values(TripType).map((tripType) => {
    return { value: tripType, label: tripType };
  });

  const [departureAirport, setDepartureAirport] =
    useState<AirportOption | null>(null);
  const [destinationAirport, setDestinationAirport] =
    useState<AirportOption | null>(null);
  const [cabinClass, setCabinClass] = useState<CabinClass | null>(
    cabinClassOptions[0].value
  );
  const [tripType, setTripType] = useState<TripType | null>(
    tripTypeOptions[1].value
  );

  const [flightEstimate, setFlightEstimate] =
    useState<FlightEstimateResponse>();

  const [error, setError] = useState<string>();

  const estimateEmissions = useCallback(() => {
    if (departureAirport === null || destinationAirport === null) {
      setError("You much choose both a departure and destination airport.");
      return;
    } else {
      setError(undefined);
    }

    EstimateService.getFlightEstimate({
      departure: departureAirport!.value,
      destination: destinationAirport!.value,
      cabinClass: cabinClass ?? undefined,
      tripType: tripType ?? undefined,
    }).then((response) => {
      setFlightEstimate(response);
    });
  }, [departureAirport, destinationAirport, cabinClass, tripType]);

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex-1 flex flex-col items-center gap-4 p-8 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            Estimate your flight emissions
          </h1>
          <span className="text-sm">
            Use this tool to help estimate the amount of carbon emitted in your
            flight.
          </span>
        </div>

        {/* Vertrek vluchthaven */}
        <FormField
          title="Departure"
          helpText="The airport your flight departed from."
          input={
            <AirportInput
              instanceId="departure-select"
              setOption={setDepartureAirport}
            />
          }
        />

        {/* Aankomst vluchthaven */}
        <FormField
          title="Destination"
          helpText="The airport your flight landed on."
          input={
            <AirportInput
              instanceId="destination-select"
              setOption={setDestinationAirport}
            />
          }
        />

        {/* Cabin class */}
        <FormField
          title="Cabin class"
          helpText="Which cabin class did you fly?"
          input={
            <Select
              instanceId="cabinclass-select"
              options={cabinClassOptions}
              defaultValue={cabinClassOptions[0]}
              onChange={(option) =>
                setCabinClass(option === null ? null : option.value)
              }
              className="text-black"
            />
          }
        />

        {/* Trip */}
        <FormField
          title="Trip"
          helpText="Round trip or just a one way flight?"
          input={
            <Select
              instanceId="triptype-select"
              options={tripTypeOptions}
              defaultValue={tripTypeOptions[1]}
              onChange={(option) =>
                setTripType(option === null ? null : option.value)
              }
              className="text-black"
            />
          }
        />
        {error && <div className="text-red-500">{error}</div>}

        <Button
          onClick={() => estimateEmissions()}
          className="w-[200px] self-center mt-2 text-sm"
        >
          Estimate my emissions
        </Button>
        {/* Estimation */}
        {flightEstimate && (
          <FlightEstimateTable flightEstimate={flightEstimate} />
        )}
      </div>
      <div className="flex flex-col items-center gap-4 py-6 bg-secondary border-t border-t-accentSecondary w-full">
        <Button
          onClick={() => router.push("/dashboard/sink")}
          className="text-sm"
        >
          Continue without estimating emissions
        </Button>
      </div>
    </div>
  );
}
