import { SinkingFormData, ReasonOptions } from "@/app/types";
import SelectReasonButton from "./SelectReasonButton";
import { memo, useEffect, useMemo, useState } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface ReasonSelectProps {
  setValue: (name: keyof SinkingFormData, value: any) => void;
  watch: (name: string) => string;
  register: UseFormRegister<SinkingFormData>;
}

export default function ReasonSelect({
  setValue,
  watch,
  register,
}: ReasonSelectProps) {
  const reason = watch("reason");

  const [memoLength, setMemoLength] = useState<number>(0);

  const textEncoder = useMemo(() => {
    return new TextEncoder();
  }, []);

  const selectReason = (selectedReason: ReasonOptions) => {
    if (selectedReason === reason) {
      setValue("reason", null);
      setMemoLength(0);
    } else {
      setValue("reason", selectedReason);
      const lengthInBytes = textEncoder.encode(selectedReason).length;
      setMemoLength(lengthInBytes);
    }
  };

  useEffect(() => {
    const lengthInBytes = textEncoder.encode(reason).length;
    setMemoLength(lengthInBytes);
  }, [reason, setMemoLength, textEncoder]);

  // TODO: enforce max length of reason message 29 bytes

  return (
    <div className="flex flex-col gap-1 md:gap-3">
      <span className="text-xl md:text-2xl font-bold mb-0">
        Offset reason (optional)
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs md:text-sm">
          Select a reason for creating this offset. Use it to remind yourself
          why you make this donation.
        </span>
        <div className="flex gap-2 my-2">
          {Object.values(ReasonOptions).map((option) => {
            return (
              <SelectReasonButton
                key={`${option}_button`}
                isSelected={reason === option}
                onClick={() => selectReason(option)}
                reason={option}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs md:text-sm">
          ...or write your own message.
        </span>
        <textarea
          {...register("reason", {
            validate: (value) => {
              return memoLength <= 28 || "Reason label is too long.";
            },
          })}
          className="my-2 text-black py-1 px-2 rounded-sm"
        />
        <span
          className={`self-end text-xs ${memoLength > 28 && "text-red-500"}`}
        >
          {memoLength}/28
        </span>
      </div>
    </div>
  );
}
