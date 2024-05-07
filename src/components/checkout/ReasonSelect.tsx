import { CheckoutFormData, ReasonOptions } from "@/app/types";
import SelectReasonButton from "./SelectReasonButton";

interface ReasonSelectProps {
  setValue: (name: keyof CheckoutFormData, value: any) => void;
  watch: (name: string) => string;
}

export default function ReasonSelect({ setValue, watch }: ReasonSelectProps) {
  const reason = watch("reason");

  const selectReason = (selectedReason: ReasonOptions) => {
    if (selectedReason === reason) {
      setValue("reason", null);
    } else {
      setValue("reason", selectedReason);
    }
  };

  const onReasonTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue("reason", event.target.value);
  };

  return (
    <div className="flex flex-col p-4 gap-1">
      <span className="text-xl font-bold mb-0">Add a label (optional)</span>
      <span className="text-xs">Select a reason...</span>
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
      <span className="text-xs">...or write your own message.</span>
      <textarea
        onChange={onReasonTextChange}
        value={reason}
        className="my-2 text-black p-1"
      />
    </div>
  );
}
