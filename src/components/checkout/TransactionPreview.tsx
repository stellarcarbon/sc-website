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
    <div className="p-4 flex flex-col items-center justify-center bg-primary border border-accentSecondary rounded">
      <h3 className="text-xl font-bold">Transaction preview</h3>
      <div className="grid grid-cols-2 text-center my-4 md:my-9 w-full max-w-[88%] xl:max-w-[450px]">
        <span className="text-start">Amount to sink</span>
        <div className="flex gap-1 items-center justify-end text-accent">
          <CARBONCurrencyIcon />
          <span className="font-bold text-end ">{tonnes}</span>
        </div>

        <span className="text-start">Currency to use</span>
        <span className="font-bold text-end text-accent">{currency}</span>

        <hr className="col-span-2 my-2 w-[100%]" />

        <span className="text-start">Price in $</span>
        <span className="font-bold text-end text-accent">{`$ ${
          Number.isNaN(quote) ? "" : quote.toFixed(2)
        }`}</span>
      </div>
      {/* <span className="text-xs mb-4 mx-4 text-center">
    Make sure the transaction above is correct before finalizing the
    transaction.
  </span> */}
      <Button
        onClick={onClick}
        className="!py-2 !w-[60%] max-w-[200px] text-md self-center"
        disabled={false}
      >
        Go to signing
      </Button>
    </div>
  );
}
