import SelectReasonButton from "./SelectReasonButton";
import { useEffect, useMemo, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import FormError from "@/components/FormError";
import { useSinkFormContext } from "@/context/SinkFormContext";
import { faTag } from "@fortawesome/free-solid-svg-icons";

interface ReasonSelectProps {
  error?: string;
}

export const ReasonOptions: Record<ReasonOptionKey, ReasonOption> = {
  ENVIRONMENT: {
    message: "🌎✨🌍💕🌏",
    label: "Contribute to environment & nature",
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

export default function ReasonSelect({ error }: ReasonSelectProps) {
  const { watch, setValue, register } = useSinkFormContext();

  const memo = watch("memo");

  const [selectedReason, setSelectedReason] = useState<ReasonOption>();
  const [memoLength, setMemoLength] = useState<number>(0);

  useEffect(() => {
    if (memo === "✈️ air travel") {
      setSelectedReason(ReasonOptions.AIRTRAVEL);
    } else if (memo === "🛣️ road travel") {
      setSelectedReason(ReasonOptions.ROADTRAVEL);
    } else if (memo === "🏠 household") {
      setSelectedReason(ReasonOptions.HOUSEHOLD);
    } else if (memo === "🌎✨🌍💕🌏") {
      setSelectedReason(ReasonOptions.ENVIRONMENT);
    }
  }, [memo, setSelectedReason]);

  const textEncoder = useMemo(() => {
    return new TextEncoder();
  }, []);

  const selectReason = (reason: ReasonOption) => {
    if (selectedReason === reason) {
      setSelectedReason(undefined);
      setValue("memo", "");
      setMemoLength(0);
      return;
    }

    setSelectedReason(reason);
  };

  useEffect(() => {
    if (selectedReason) setValue("memo", selectedReason.message);
  }, [selectedReason, setValue]);

  useEffect(() => {
    if (memo?.length > 0) {
      const lengthInBytes = textEncoder.encode(memo).length;
      setMemoLength(lengthInBytes);
    }
  }, [memo, setMemoLength, textEncoder]);

  // TODO: enforce max length of reason message 29 bytes

  return (
    <>
      <SectionHeader icon={faTag}>Label your contribution</SectionHeader>
      <div className="mx-3 md:mx-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            Why are you making this contribution? Leave a public message and it
            will be stored, reminding you and others why you contributed.
          </div>

          <div className="flex justify-center gap-4 md:gap-2 my-2">
            {Object.values(ReasonOptions).map((option, idx) => {
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

          <div
            className="
      flex flex-col gap-4"
          >
            {
              <div className="text-sm">
                {/* <div className="mt-2 mb-4">{selectedReason?.explanation}</div> */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs md:text-sm">
                    Customize your transaction label
                  </span>
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
                    {memoLength > 28 && `Label can have max. 28 characters. `}
                    {`${memoLength}/28`}
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
        <FormError>{error}</FormError>
      </div>
    </>
  );
}
