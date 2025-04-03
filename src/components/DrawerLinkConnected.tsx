import { useSCRouter } from "@/utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { DrawerLinkProps } from "./DrawerLink";
import { useAppContext } from "@/context/appContext";

export default function DrawerLinkConnected({
  href,
  children,
  disconnect,
}: DrawerLinkProps) {
  const { disconnectWallet, closeDrawer } = useAppContext();
  const pathname = usePathname();
  const router = useSCRouter();

  const isCurrentRoute = useMemo(() => {
    if (disconnect) return false;
    if (href === "/") return pathname === "/";
    return pathname === href + "/";
  }, [href, pathname, disconnect]);

  const onClick = () => {
    if (disconnect) {
      disconnectWallet();
    } else {
      router.push(href);
    }

    closeDrawer();
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
