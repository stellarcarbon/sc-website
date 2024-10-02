import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import AsyncSelect from "react-select/async";
import airports from "@/airports.json";
import { debounce } from "lodash";

export interface AirportOption {
  value: string;
  label: string;
}

interface AirportInputProps {
  setOption: Dispatch<SetStateAction<AirportOption | null>>;
}

export default function AirportInput({ setOption }: AirportInputProps) {
  const airportData: AirportOption[] = useMemo(() => {
    // Fix missing labels and sort alphabetically by value.
    const fixedAirports: AirportOption[] = airports.map((airport) => {
      if (airport.label === null) {
        return {
          value: airport.value,
          label: airport.value,
        };
      } else {
        return airport;
      }
    });

    return fixedAirports.sort((a, b) => {
      return a.value.localeCompare(b.value);
    });
  }, []);

  // Use useMemo to initialize the debounced function only once
  const debouncedFilter = useMemo(
    () =>
      debounce(
        (inputValue: string, callback: (options: AirportOption[]) => void) => {
          const filteredOptions = airportData.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          );
          callback(filteredOptions);
        },
        300
      ), // 300ms debounce time
    [] // No dependencies, so it initializes only once
  );

  // Create the loadOptions wrapper function using useCallback
  const loadOptions = useCallback(
    (inputValue: string, callback: (options: AirportOption[]) => void) => {
      return new Promise<AirportOption[]>((resolve) => {
        debouncedFilter(inputValue, resolve);
      });
    },
    [debouncedFilter]
  ); // debouncedFilter is stable and doesn’t change

  const onChange = useCallback(
    (option: AirportOption | null) => {
      console.log("?");
      setOption(option);
    },
    [setOption]
  );

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={onChange}
      placeholder="Search an airport"
      className="w-full text-black"
    />
  );
}
