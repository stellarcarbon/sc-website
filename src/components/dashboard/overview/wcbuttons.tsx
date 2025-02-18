import Button from "@/components/Button";

interface WalletConnectionButtonsProps {
  onEdit: () => void;
  onDisconnect: () => void;
}

export default function WalletConnectionButtons({
  onEdit,
  onDisconnect,
}: WalletConnectionButtonsProps) {
  return (
    <div className="flex mt-2 mx-2 !text-xs gap-8 justify-start">
      <Button onClick={onEdit}>Edit contact info</Button>
      <Button onClick={onDisconnect} className="hover:!bg-red-500">
        Disconnect wallet
      </Button>
    </div>
  );
}
