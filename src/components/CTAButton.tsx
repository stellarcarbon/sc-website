import { HTMLProps } from "react";
import { useSCRouter } from "@/app/utils";
import CARBONCurrencyIcon from "./icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";

interface CTAButtonProps extends HTMLProps<HTMLButtonElement> {}

export default function CTAButton({ className = "", onClick }: CTAButtonProps) {
  const router = useSCRouter();
  const { walletConnection } = useAppContext();

  return (
    <button
      type="button"
      onClick={
        onClick
          ? onClick
          : () => {
              router.push("/dashboard/sink");
            }
      }
      className={`p-1 w-[220px] flex justify-center bg-darker text-white rounded-xl border border-accentSecondary hover:bg-secondary hover:text-white ${className}`}
    >
      {/* <BuyStellarCarbonIcon /> */}
      <div className=" h-11 flex items-center gap-3">
        <CARBONCurrencyIcon width={28} height={28} />
        {walletConnection ? (
          <span className="font-semibold text-lg">Sink CARBON</span>
        ) : (
          <span className="font-semibold text-lg">Contribute now!</span>
        )}
      </div>
    </button>
  );
}
