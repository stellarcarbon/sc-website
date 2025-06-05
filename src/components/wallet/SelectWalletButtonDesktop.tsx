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
      className={`  bg-primary text-white text-sm shadow-md rounded-md border border-tertiary
         flex items-center justify-start
          px-4 h-12 w-100
      
       ${
         wallet.isAvailable
           ? !isSelected
             ? "hover:bg-secondary hover:text-white"
             : ""
           : "!bg-gray-600 !text-gray-500 border-none"
       } 
        ${
          isSelected
            ? "!bg-accent !text-black !border-accentSecondary !hover:none"
            : ""
        } 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        className={`h-[32px] w-[32px] ${
          !wallet.isAvailable && "filter brightness-50"
        }`}
        src={wallet.icon}
        alt={`${wallet} wallet select button`}
      />
      <div className="flex-1">{wallet.name}</div>
    </button>
  );
}
