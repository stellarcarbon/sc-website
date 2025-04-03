import { useSCRouter } from "@/utils";
import DrawerLinkConnected from "@/components/DrawerLinkConnected";
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
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import CTAButton from "@/components/CTAButton";

export default function NavBarWallet() {
  const { isMobileDevice, walletConnection } = useAppContext();

  const router = useRouter();

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

  const onClick = () => {
    if (!isMobileDevice) {
      setShowDropdown(!showDropdown);
    } else {
      router.push("/dashboard");
    }
  };

  if (!walletConnection) {
    return <CTAButton white />;
  }

  return (
    <div className="relative">
      <div onClick={onClick} ref={connInfoRef}>
        <WalletConnectionInfoSmall />
      </div>
      {showDropdown && (
        <div
          className="absolute right-0 w-64 top-11 p-2 bg-primary border rounded border-accentSecondary text-white"
          ref={dropdownRef}
        >
          <DrawerLinkConnected href="/dashboard/sink">
            <CARBONCurrencyIcon />
            <span>Sink CARBON</span>
          </DrawerLinkConnected>
          <DrawerLinkConnected href="/estimator/flight">
            <FontAwesomeIcon icon={faCalculator} />
            <span>Emission estimator</span>
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
      )}
    </div>
  );
}
