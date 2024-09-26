"use client";

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
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
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
      className={`w-full flex flex-col border-b rounded-t-md border-b-tertiary transition-all duration-500 ${
        isOpen ? "bg-secondary" : "bg-primary"
      }`}
    >
      <div className="flex justify-between p-2 md:p-4">
        <StellarCarbonIcon className="ml-2 md:ml-4 !h-12" />
        {walletConnection && (
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faBars} size="xl" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-2 md:px-8 md:pb-4 flex justify-between items-center gap-3 mt-2">
          <div className="flex items-center justify-start border border-tertiary rounded p-1 flex-1">
            <div className="flex flex-col items-center justify-between h-full gap-1 px-1 border-r border-r-tertiary">
              {walletConnection?.walletType.icon && (
                <Image
                  height={32}
                  width={32}
                  src={walletConnection?.walletType.icon}
                  alt="wallet icon"
                />
              )}
              <div className="text-xs text-center">
                {walletConnection?.walletType.name}
              </div>
            </div>
            <div className="flex-1 text-center text-sm md:text-base text-wrap break-words text-white px-6">
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
