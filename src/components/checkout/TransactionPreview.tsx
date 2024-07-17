import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";

interface TransactionPreviewProps {
  tonnes: number;
  currency: string;
  quote: number;
}

export default function TransactionPreview({
  tonnes,
  currency,
  quote,
}: TransactionPreviewProps) {
  return (
    <div className="p-6 w-full md:w-[70%] self-center flex flex-col gap-6 items-center justify-center bg-primary border border-accentSecondary rounded">
      <div className="grid grid-cols-2 gap-1 text-center w-full">
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
    </div>
  );
}
