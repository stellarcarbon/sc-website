import { ISupportedWallet, WalletType } from "stellar-wallets-kit";

type SelectWalletButtonProps = {
  wallet: ISupportedWallet;
  isSelected: boolean;
  onClick: () => void;
};

export default function SelectWalletButton({
  wallet,
  isSelected,
  onClick,
}: SelectWalletButtonProps) {
  return (
    <div className="relative">
      <img
        id={`${wallet.type}_SelectWalletButton`}
        onClick={onClick}
        className={`h-20 w-20 rounded-full p-3 ${
          wallet.isAvailable
            ? `hover:border hover:border-black cursor-pointer ${
                isSelected ? "bg-slate-400 border border-black" : "bg-white"
              } `
            : "opacity-30"
        } `}
        src={wallet.icon}
      />
      {!wallet.isAvailable && (
        <div className="rounded-full absolute inset-0 bg-slate-400 opacity-50"></div>
      )}
    </div>
  );
}
