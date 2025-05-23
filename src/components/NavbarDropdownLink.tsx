import { useSCRouter } from "@/utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { DrawerLinkProps } from "./DrawerLink";
import { useAppContext } from "@/context/appContext";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function NavbarDropdownLink({
  href,
  children,
  disconnect,
}: DrawerLinkProps) {
  const { disconnectWallet, setIsDropdownOpen } = useAppContext();

  const pathname = usePathname();
  const router = useSCRouter();

  const isCurrentRoute = useMemo(() => {
    if (disconnect) return false;
    if (href === "/") return pathname === "/";
    return pathname === href + "/";
  }, [href, pathname, disconnect]);

  const onClick = () => {
    if (!disconnect) {
      router.push(href);
    } else {
      disconnectWallet();
    }

    setIsDropdownOpen(false);
  };

  return (
    <div
      onClick={onClick}
      className={`py-3 px-2 
        hover:bg-secondary active:text-yellow-100
        active:bg-tertiary
        rounded cursor-pointer
        flex items-center gap-2
        ${isCurrentRoute ? "text-yellow-400" : ""}`}
    >
      {children}
    </div>
  );
}
