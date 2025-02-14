import { SelectWalletButtonProps } from "./SelectWalletButton";

export default function SelectWalletButtonDesktop({
  wallet,
  isSelected,
  onClick,
  className,
  disabled,
}: SelectWalletButtonProps) {
  return (
    <button
      id={`${wallet.type}_SelectWalletButtonDesktop`}
      className={`h-12 flex bg-accent text-black text-sm items-center shadow-md border border-transparent rounded-md justify-start px-4 w-100
      
       ${
         wallet.isAvailable
           ? !isSelected
             ? "hover:bg-accentSecondary hover:text-white"
             : ""
           : "!bg-gray-600 text-gray-500 border-none"
       } 
        ${
          isSelected
            ? "!bg-primary text-white !border-accentSecondary !hover:none"
            : ""
        } 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        className="h-[32px] w-[32px]"
        src={wallet.icon}
        alt={`${wallet} wallet select button`}
      />
      <div className="flex-1">{wallet.name}</div>
    </button>
  );
}
