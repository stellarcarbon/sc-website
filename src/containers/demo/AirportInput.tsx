import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import AsyncSelect from "react-select/async";
import airports from "@/airports.json";
import { debounce } from "lodash";

export interface AirportOption {
  value: string;
  label: string;
}

interface AirportInputProps {
  instanceId: string;
  setOption: Dispatch<SetStateAction<AirportOption | null>>;
}

export default function AirportInput({
  setOption,
  instanceId,
}: AirportInputProps) {
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
          const inputLower = inputValue.toLowerCase();

          const filtered = airportData.filter((option) =>
            option.label.toLowerCase().includes(inputLower)
          );
          // Find the exact matches on airport code and move them to the top of the list
          // 2) Partition into exact‐value matches vs the rest
          const [exactMatches, partialMatches] = filtered.reduce<
            [AirportOption[], AirportOption[]]
          >(
            (acc, option) => {
              if (option.value.toLowerCase() === inputLower) {
                acc[0].push(option);
              } else {
                acc[1].push(option);
              }
              return acc;
            },
            [[], []]
          );

          // 3) Concat so exacts come first
          const orderedOptions = [...exactMatches, ...partialMatches];

          callback(orderedOptions);
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
      setOption(option);
    },
    [setOption]
  );

  return (
    <AsyncSelect
      instanceId={instanceId}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={onChange}
      placeholder="Search an airport"
      className="w-full text-black"
    />
  );
}
