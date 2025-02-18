import { useSCRouter } from "@/app/utils";
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
            <MenuOption onClick={handleMyStellar}>My Stellarcarbon</MenuOption>
            <MenuOption onClick={handleDisconnect}>
              Disconnect wallet
            </MenuOption>
          </div>
        )}
      </div>
    </>
  );
}

function MenuOption({
  children,
  onClick,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      onClick={onClick}
      className="p-2 px-2 hover:bg-secondary rounded cursor-pointer"
    >
      {children}
    </div>
  );
}
