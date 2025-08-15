import WalletConnectionInfoSmall from "@/components/WalletConnectionInfoSmall";
import { useAppContext } from "@/context/appContext";
import { useEffect, useRef } from "react";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import CTAButton from "@/components/CTAButton";
import NavbarDropdownLink from "@/components/NavbarDropdownLink";

export default function NavBarWallet() {
  const {
    isMobileDevice,
    walletConnection,
    isDropdownOpen,
    setIsDropdownOpen,
  } = useAppContext();

  const pathname = usePathname();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const connInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !connInfoRef.current?.contains(event.target as Node)
      ) {
        // setShowDropdown(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, setIsDropdownOpen]);

  const onClick = () => {
    if (!isMobileDevice) {
      setIsDropdownOpen(true);
    } else {
      router.push("/dashboard");
    }
  };

  if (!walletConnection && pathname === "/") {
    return <div className="w-[175px] h-1"></div>;
  }

  if (walletConnection === null) {
    return null;
  }

  if (walletConnection === undefined) {
    return <CTAButton white small />;
  }

  return (
    <div className="relative">
      <div onClick={onClick} ref={connInfoRef}>
        <WalletConnectionInfoSmall />
      </div>
      {isDropdownOpen && (
        <div
          className="absolute right-0 w-64 top-11 p-2 bg-darkest border rounded border-accentSecondary text-white flex flex-col gap-1"
          ref={dropdownRef}
        >
          <NavbarDropdownLink href="/dashboard/sink">
            <CARBONCurrencyIcon />
            <span>Sink CARBON</span>
          </NavbarDropdownLink>
          <NavbarDropdownLink href="/estimator/flight">
            <FontAwesomeIcon icon={faCalculator} />
            <span>Emission estimator</span>
          </NavbarDropdownLink>
          <NavbarDropdownLink href="/dashboard">
            <FontAwesomeIcon icon={faUser} width={18} />
            <span>My Stellarcarbon</span>
          </NavbarDropdownLink>
          <div className="h-[1px] my-1 w-[90%] mx-auto bg-secondary" />
          <NavbarDropdownLink href="" disconnect>
            <FontAwesomeIcon icon={faRightFromBracket} width={18} />
            <span>Disconnect wallet</span>
          </NavbarDropdownLink>
        </div>
      )}
    </div>
  );
}
