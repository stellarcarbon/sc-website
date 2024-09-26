"use client";

import { HTMLInputTypeAttribute } from "react";

interface CO2CalculatorFormField {
  name: string;
  label?: string;
  type: HTMLInputTypeAttribute;
}

const formFields: CO2CalculatorFormField[] = [
  { name: "origin", label: "3-letter IATA airport code", type: "text" },
  { name: "destination", label: "3-letter IATA airport code", type: "text" },
  {
    name: "operatingCarrierCode",
    label: "2-letter IATA airline code",
    type: "text",
  },
  { name: "flightNumber", type: "text" },
  { name: "departureDate", type: "date" },
];

export default function CO2Calculator() {
  return (
    <form className="flex flex-col gap-6 text-black w-full">
      {formFields.map((field) => {
        return (
          <div key={`co2_${field.name}`} className="flex flex-col">
            <input
              className="p-2 rounded"
              type={field.type}
              placeholder={field.name}
            />
            <span className="text-white text-xs pl-1 mt-1">{field.label}</span>
          </div>
        );
      })}
      {/* <div className="flex flex-col">
        <input type="text" placeholder="Origin" />
        <span>3-letter IATA airport code</span>
      </div> */}
    </form>
  );
}
