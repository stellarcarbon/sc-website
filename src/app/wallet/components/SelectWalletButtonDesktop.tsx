import { SelectWalletButtonProps } from "./SelectWalletButton";

export default function SelectWalletButtonDesktop({
  wallet,
  isSelected,
  onClick,
  className,
}: SelectWalletButtonProps) {
  return (
    <button
      id={`${wallet.type}_SelectWalletButtonDesktop`}
      className={`w-[32%] h-12 flex bg-accentSecondary items-center shadow-md border border-transparent rounded-md justify-start gap-6 px-4 w-100
      
       ${
         wallet.isAvailable
           ? !isSelected
             ? "hover:bg-primary hover:text-white"
             : ""
           : "!bg-gray-600 text-gray-500 border-none"
       } 
        ${isSelected ? "!bg-accent text-black !border-black !hover:none" : ""} 
        ${className}`}
      onClick={onClick}
      disabled={!wallet.isAvailable}
    >
      <img className="h-[32px] w-[32px]" src={wallet.icon} />
      <div className="">{wallet.name}</div>
    </button>
  );
}
