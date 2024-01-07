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
      className={`h-16 flex items-center shadow-md rounded-md mx-16 justify-start gap-6 px-4 border border-gray w-100
      
       ${
         wallet.isAvailable
           ? !isSelected
             ? "hover:bg-blue-50 hover:text-black hover:border-gray-300"
             : ""
           : "bg-gray-100 text-gray-300"
       } 
        ${
          isSelected
            ? "bg-slate-600 text-white border-gray-500 !hover:none"
            : ""
        } 
        ${className}`}
      onClick={onClick}
      disabled={!wallet.isAvailable}
    >
      <img className="h-[42px] w-[42px]" src={wallet.icon} />
      {wallet.name}
    </button>
  );
}
