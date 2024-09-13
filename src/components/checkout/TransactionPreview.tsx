import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Button from "../Button";

interface TransactionPreviewProps {
  tonnes: number;
  currency: string;
  quote: number;
  handleSubmit: () => void;
}

export default function TransactionPreview({
  tonnes,
  currency,
  quote,
  handleSubmit,
}: TransactionPreviewProps) {
  return (
    <div className="p-6 w-full md:w-[100%] self-center flex flex-col gap-6 items-center justify-center bg-primary border border-accentSecondary rounded">
      <h3 className="text-xl md:text-2xl font-bold">Your transaction</h3>
      <div className="md:px-24 grid grid-cols-2 gap-1 text-center w-full">
        <span className="text-start">Amount to sink</span>
        <div className="flex gap-1 items-center justify-end text-accent">
          <CARBONCurrencyIcon />
          <span className="font-bold text-end ">{tonnes}</span>
        </div>

        <span className="text-start">Preferred currency</span>
        <span className="font-bold text-end text-accent">{currency}</span>

        <hr className="col-span-2 mt-2 mb-4 w-[100%]" />

        <span className="text-start">Price in $</span>
        <span className="font-bold text-end text-accent">{`$ ${
          Number.isNaN(quote) ? "" : quote.toFixed(2)
        }`}</span>
      </div>
      <Button
        onClick={handleSubmit}
        className="!py-2 !w-[60%] max-w-[200px] mt-1 mb-2 text-md self-center"
        disabled={false}
      >
        Continue to sign
      </Button>
    </div>
  );
}
