import { useAppContext } from "@/context/appContext";
import TruncatedHash from "./dashboard/TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faHamburger,
  faPerson,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownOption from "./DropdownOption";
import { useRouter } from "next/navigation";
import CARBONCurrencyIcon from "./icons/CARBONCurrencyIcon";
import DrawerLink from "./DrawerLink";

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
    closeDrawer();
  }, [router, setShowDropdown, closeDrawer]);

  const handleMyStellar = useCallback(() => {
    router.push("/dashboard");
    setShowDropdown(false);
    closeDrawer();
  }, [router, setShowDropdown, closeDrawer]);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
    setShowDropdown(false);
    closeDrawer();
  }, [disconnectWallet, setShowDropdown, closeDrawer]);

  return (
    <div className="flex-1 bg-darker">
      <div
        onClick={toggleDropdown}
        className={`${showDropdown ? "" : ""}
      px-4 py-3
      text-white
    
      flex items-center justify-between
      `}
      >
        <div className="w-full flex justify-center items-center gap-3">
          <div>
            <img className="h-6 w-6" src={walletConnection?.walletType.icon} />
          </div>
          <div className="text-sm">
            <TruncatedHash hash={walletConnection?.stellarPubKey} uppercase />
          </div>
        </div>
        {/* <div className="flex justify-end">
          <FontAwesomeIcon icon={showDropdown ? faChevronUp : faChevronDown} />
        </div> */}
      </div>

      {true && (
        <div ref={dropdownRef} className="text-white p-2 flex flex-col gap-2">
          <DropdownOption href="/dashboard/sink">
            <CARBONCurrencyIcon />
            <span>Sink CARBON</span>
          </DropdownOption>
          <DropdownOption href="/dashboard">
            <FontAwesomeIcon icon={faUser} width={18} />
            <span>My Stellarcarbon</span>
          </DropdownOption>
          <DropdownOption href="" disconnect>
            <FontAwesomeIcon icon={faRightFromBracket} width={18} />
            <span>Disconnect wallet</span>
          </DropdownOption>
        </div>
      )}
    </div>
  );
}
