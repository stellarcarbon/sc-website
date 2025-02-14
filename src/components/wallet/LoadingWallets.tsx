import { Blocks } from "react-loader-spinner";

export default function LoadingWallets() {
  return (
    <div className="flex flex-col items-center justify-center text-xs font-bold">
      <Blocks />
      <span>Loading wallets...</span>
    </div>
  );
}
