import { useAppContext } from "@/context/appContext";
import StellarPubKey from "./dashboard/StellarPubKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownOption from "./DropdownOption";
import { useRouter } from "next/navigation";

export default function DrawerWallet() {
  const { walletConnection, disconnectWallet, closeDrawer } = useAppContext();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => {
    setShowDropdown(!showDropdown);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [showDropdown]);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      dropdownRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showDropdown, dropdownRef]);

  const handleSinkCarbon = useCallback(() => {
    router.push("/dashboard/sink");
    setShowDropdown(false);
  }, [router, setShowDropdown]);

  const handleMyStellar = useCallback(() => {
    router.push("/dashboard");
    setShowDropdown(false);
  }, [router, setShowDropdown]);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
    setShowDropdown(false);
    closeDrawer();
  }, [disconnectWallet, setShowDropdown, closeDrawer]);

  return (
    <div className="mx-8">
      <div
        onClick={toggleDropdown}
        className={`${showDropdown ? "" : ""}
      px-4 py-3
      text-white
    bg-darker hover:bg-secondary rounded shadow-lg
      border border-accentSecondary
      flex items-center gap-4 justify-between
      cursor-pointer
      `}
      >
        <div>
          <img className="h-6 w-6" src={walletConnection?.walletType.icon} />
        </div>
        <div className="text-sm">
          <StellarPubKey pubKey={walletConnection?.stellarPubKey} />
        </div>
        <div className="flex justify-end">
          <FontAwesomeIcon icon={showDropdown ? faChevronUp : faChevronDown} />
        </div>
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="text-white
          mt-1 mb-8 p-2
        bg-darker rounded shadow-lg
        border border-accentSecondary
        flex flex-col gap-2"
        >
          <DropdownOption onClick={handleSinkCarbon}>
            Sink CARBON
          </DropdownOption>
          <DropdownOption onClick={handleMyStellar}>
            My Stellarcarbon
          </DropdownOption>
          <DropdownOption onClick={handleDisconnect}>
            Disconnect wallet
          </DropdownOption>
        </div>
      )}
    </div>
  );
}
