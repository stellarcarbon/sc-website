import { HTMLProps, useCallback } from "react";
import { useSCRouter } from "@/utils";
import CARBONCurrencyIcon from "./icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";

export default function CTAButton({
  white,
  small,
  huge,
}: {
  white?: boolean;
  small?: boolean;
  huge?: boolean;
}) {
  const router = useSCRouter();
  const { walletConnection, isMobileDevice, closeDrawer } = useAppContext();

  const onClick = useCallback(() => {
    router.push("/dashboard/sink");

    if (isMobileDevice) closeDrawer();
  }, [router, isMobileDevice, closeDrawer]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1
        flex items-center justify-center 
       
       active:bg-tertiary active:text-white
        border border-accentSecondary
        ${
          white
            ? "bg-white text-black"
            : "bg-darkest hover:bg-accent hover:text-black"
        }
        ${
          small
            ? "px-3 text-sm h-9 gap-1 rounded-lg"
            : huge
            ? "p-3 gap-3 text-2xl rounded-lg"
            : "w-[220px] text-lg h-12 gap-3 rounded-xl"
        }
        
        `}
    >
      {/* <BuyStellarCarbonIcon /> */}

      <CARBONCurrencyIcon width={small ? 18 : 28} height={small ? 18 : 28} />
      {walletConnection ? (
        <span className="font-semibold">Sink CARBON</span>
      ) : (
        <span className="font-semibold">Contribute now!</span>
      )}
    </button>
  );
}
