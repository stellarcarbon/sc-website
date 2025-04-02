import { SinkingFormData } from "@/app/types";
import SelectReasonButton from "./SelectReasonButton";
import { memo, useEffect, useMemo, useState } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { useReasonSelectContext } from "./ReasonSelectContext";
import Button from "../Button";

interface ReasonSelectProps {
  setValue: (name: keyof SinkingFormData, value: any) => void;
  watch: (name: string) => string;
  register: UseFormRegister<SinkingFormData>;
}

export const ReasonOptions: Record<ReasonOptionKey, ReasonOption> = {
  ENVIRONMENT: {
    message: "🌎✨🌍💕🌏",
    label: "Environment & nature",
    explanation:
      "Contributing to a healthy planet in general and not compensating specific emissions.",
  },
  HOUSEHOLD: {
    message: "🏠 household",
    label: "Household emissions",
    explanation:
      "You are looking to compensate for emissions made by your household.",
  },
  AIRTRAVEL: {
    message: "✈️ air travel",
    label: "Air travel emissions",
    explanation: "Compensating for air travel emissions.",
  },
  ROADTRAVEL: {
    message: "🛣️ road travel",
    label: "Road travel emissions",
    explanation: "Compensating for road travel emissions.",
  },
};

export type ReasonOptionKey =
  | "ENVIRONMENT"
  | "HOUSEHOLD"
  | "AIRTRAVEL"
  | "ROADTRAVEL";

export type ReasonOption = {
  message: string;
  label: string;
  explanation: string;
};

export default function ReasonSelect({
  setValue,
  watch,
  register,
}: ReasonSelectProps) {
  const memo = watch("memo");
  const [selectedReason, setSelectedReason] = useState<ReasonOption>();

  const [memoLength, setMemoLength] = useState<number>(0);

  const textEncoder = useMemo(() => {
    return new TextEncoder();
  }, []);

  const selectReason = (reason: ReasonOption) => {
    if (selectedReason === reason) {
      setSelectedReason(undefined);
      setValue("memo", null);
      setMemoLength(0);
      return;
    }

    setSelectedReason(reason);
    setValue("memo", reason.message);
    const lengthInBytes = textEncoder.encode(reason.message).length;
    setMemoLength(lengthInBytes);
  };

  useEffect(() => {
    const lengthInBytes = textEncoder.encode(memo).length;
    setMemoLength(lengthInBytes);
  }, [memo, setMemoLength, textEncoder]);

  // TODO: enforce max length of reason message 29 bytes

  console.log(selectedReason);

  return (
    <div className="flex flex-col gap-1 md:gap-3">
      <span className="text-xl md:text-2xl font-bold mb-0">
        Label this contribution
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-sm md:text-sm">
          Label your contribution to remind yourself and others why you did it.
        </span>
        <div className="flex justify-between gap-1 md:gap-4 my-2">
          {Object.values(ReasonOptions).map((option, idx) => {
            console.log(selectedReason, option);
            return (
              <SelectReasonButton
                key={`${idx}_button`}
                isSelected={selectedReason?.label === option.label}
                onClick={() => selectReason(option)}
                reason={option}
              />
            );
          })}
        </div>
      </div>

      <div
        className="
      flex flex-col gap-4"
      >
        {
          <div className="text-sm">
            {/* <div className="mt-2 mb-4">{selectedReason?.explanation}</div> */}
            <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm">Your transaction label</span>
              <textarea
                {...register("memo", {
                  validate: (value) => {
                    return memoLength <= 28 || "Reason label is too long.";
                  },
                })}
                className=" text-black py-1 px-2 rounded-sm"
              />
              <span
                className={`self-end text-[10px] leading-[1rem] ${
                  memoLength > 28 && "text-red-500"
                }`}
              >
                {`${memoLength}/28`}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
