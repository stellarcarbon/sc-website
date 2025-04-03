import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import DrawerLinkConnected from "./DrawerLinkConnected";
import CARBONCurrencyIcon from "./icons/CARBONCurrencyIcon";

export default function DrawerWallet() {
  const { walletConnection } = useAppContext();

  return (
    <div className="flex-1 p-4 border-t border-t-accent">
      <div className="py-4 text-white flex items-center justify-between">
        <div className="flex justify-center items-center gap-3 bg-darker p-2 mx-auto rounded border border-accentSecondary">
          <div>
            <img className="h-6 w-6" src={walletConnection?.walletType.icon} />
          </div>
          <div className="text-sm">
            <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
          </div>
        </div>
      </div>

      <div className="text-white flex flex-col gap-2">
        <DrawerLinkConnected href="/dashboard/sink">
          <CARBONCurrencyIcon />
          <span>Sink CARBON</span>
        </DrawerLinkConnected>
        <DrawerLinkConnected href="/dashboard">
          <FontAwesomeIcon icon={faUser} width={18} />
          <span>My Stellarcarbon</span>
        </DrawerLinkConnected>
        <DrawerLinkConnected href="" disconnect>
          <FontAwesomeIcon icon={faRightFromBracket} width={18} />
          <span>Disconnect wallet</span>
        </DrawerLinkConnected>
      </div>
    </div>
  );
}
