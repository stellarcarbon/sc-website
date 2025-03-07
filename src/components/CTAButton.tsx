import { HTMLProps, useCallback } from "react";
import { useSCRouter } from "@/utils";
import CARBONCurrencyIcon from "./icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";

export default function CTAButton() {
  const router = useSCRouter();
  const { walletConnection, isMobileDevice, closeDrawer } = useAppContext();

  const onClick = useCallback(() => {
    if (walletConnection) {
      router.push("/dashboard/sink");
    } else {
      router.push("/wallet");
      if (isMobileDevice) closeDrawer();
    }
  }, [walletConnection, router, isMobileDevice, closeDrawer]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1
        w-[220px]
        flex justify-center
        bg-darker hover:bg-secondary rounded-xl
        text-white
        border border-accentSecondary`}
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
