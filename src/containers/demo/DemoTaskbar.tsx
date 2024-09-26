import HamburgerIcon from "@/components/icons/HamburgerIcon";
import StellarCarbonIcon from "@/components/icons/StellarCarbonIcon";
import { useAppContext } from "@/context/appContext";
import {
  faBars,
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faCog,
  faCogs,
  faHamburger,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

export default function DemoTaskbar() {
  const { walletConnection, disconnectWallet } = useAppContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pubKeyDisplay = useMemo(() => {
    if (walletConnection) {
      return `${walletConnection.stellarPubKey.slice(
        0,
        6
      )}...${walletConnection.stellarPubKey.slice(-6)}`;
    }
  }, [walletConnection]);

  return (
    <div
      className={`p-2 w-full flex flex-col border-b border-b-tertiary transition-all duration-500 ${
        isOpen ? "bg-secondary" : "bg-primary"
      }`}
    >
      <div className="flex justify-between">
        <StellarCarbonIcon className="ml-2 !h-12" />
        {walletConnection && (
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faCog} size="xl" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="flex justify-around items-center mt-2">
          <div className="flex justify-start">
            <div className="flex flex-col items-center justify-between h-full">
              <img
                className="h-8 w-8"
                src={walletConnection?.walletType.icon}
              />
              <div className="text-xs text-center">
                {walletConnection?.walletType.name}
              </div>
            </div>
            <div className="p-4 text-xs text-wrap break-words text-white">
              {pubKeyDisplay}
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="h-10 bg-accent p-2 px-3 rounded text-black hover:bg-red-500 flex items-center gap-2 text-sm"
          >
            {/* <FontAwesomeIcon icon={faSignOut} /> */}
            <span>Disconnect</span>
          </button>
        </div>
      )}
    </div>
  );
}
