import { HTMLProps } from "react";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";

export interface SelectWalletButtonProps extends HTMLProps<HTMLButtonElement> {
  wallet: ISupportedWallet;
  isSelected: boolean;
}

export default function SelectWalletButton({
  wallet,
  isSelected,
  disabled,
  onClick,
}: SelectWalletButtonProps) {
  return (
    <div className="flex justify-center">
      <button className="relative" onClick={onClick} disabled={disabled}>
        <img
          id={`${wallet.type}_SelectWalletButton`}
          className={`relative h-20 w-20 rounded-full p-3 ${
            !disabled
              ? ` md:hover:border hover:border-black cursor-pointer ${
                  isSelected ? "bg-white border border-black" : "bg-gray-700"
                } `
              : "opacity-30"
          } `}
          src={wallet.icon}
          alt={`${wallet.name} wallet select button`}
        />
        {disabled && (
          <div className="rounded-full absolute inset-0 bg-slate-400 opacity-50 w-20 h-20" />
        )}
      </button>
    </div>
  );
}
