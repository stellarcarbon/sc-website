import { MouseEventHandler } from "react";
import Button from "../Button";
import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";

interface TransactionPreviewProps {
  tonnes: number;
  currency: string;
  quote: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function TransactionPreview({
  tonnes,
  currency,
  quote,
  onClick,
}: TransactionPreviewProps) {
  return (
    <div className="p-4 pt-8 w-full md:w-[70%] self-center flex flex-col gap-6 items-center justify-center bg-primary border border-accentSecondary rounded">
      <div className="grid grid-cols-2 gap-1 text-center w-full max-w-[88%] md:max-w-[80%]">
        <h3 className="mb-8 text-xl font-bold col-span-2">
          Your sinking transaction
        </h3>
        <span className="text-start">Amount to sink</span>
        <div className="flex gap-1 items-center justify-end text-accent">
          <CARBONCurrencyIcon />
          <span className="font-bold text-end ">{tonnes}</span>
        </div>

        <span className="text-start">Currency to use</span>
        <span className="font-bold text-end text-accent">{currency}</span>

        <hr className="col-span-2 mt-2 mb-4 w-[100%]" />

        <span className="text-start">Price in $</span>
        <span className="font-bold text-end text-accent">{`$ ${
          Number.isNaN(quote) ? "" : quote.toFixed(2)
        }`}</span>
      </div>

      <Button
        onClick={onClick}
        className="!py-2 !w-[60%] max-w-[200px] mt-4 mb-6 text-md self-center"
        disabled={false}
      >
        Go to signing
      </Button>
    </div>
  );
}
