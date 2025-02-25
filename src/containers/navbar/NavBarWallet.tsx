import { useSCRouter } from "@/utils";
import DropdownOption from "@/components/DropdownOption";
import WalletConnectionInfoSmall from "@/components/WalletConnectionInfoSmall";
import { useAppContext } from "@/context/appContext";
import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function NavBarWallet() {
  const { disconnectWallet } = useAppContext();
  const router = useSCRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const connInfoRef = useRef<HTMLDivElement>(null);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !connInfoRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowDropdown, dropdownRef]);

  const handleMyStellar = useCallback(() => {
    router.push("/dashboard");
    setShowDropdown(false);
  }, [router, setShowDropdown]);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
    setShowDropdown(false);
  }, [disconnectWallet, setShowDropdown]);

  const handleSinkCarbon = useCallback(() => {
    router.push("/dashboard/sink");
    setShowDropdown(false);
  }, [router, setShowDropdown]);

  return (
    <>
      <div className="relative">
        <div onClick={() => setShowDropdown(!showDropdown)} ref={connInfoRef}>
          <WalletConnectionInfoSmall />
        </div>
        {showDropdown && (
          <div
            className="absolute right-0 w-64 top-11 p-2 bg-darker border rounded border-accentSecondary text-white"
            ref={dropdownRef}
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
    </>
  );
}
