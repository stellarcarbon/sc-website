import { useAppContext } from "@/context/appContext";
import { useSCRouter } from "@/utils";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback } from "react";

export interface DrawerLinkProps {
  children: ReactNode;
  href: string;
  disconnect?: boolean;
}

export default function DrawerLink({ children, href }: DrawerLinkProps) {
  const { closeDrawer } = useAppContext();
  const pathname = usePathname();
  const router = useSCRouter();

  const isCurrentRoute = () => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const onClick = useCallback(() => {
    router.push(href);
    closeDrawer();
  }, [router, href, closeDrawer]);

  return (
    <div
      className={`${isCurrentRoute() ? "text-yellow-400" : "text-accent"}
      p-4 font-bold cursor-pointer hover:text-yellow-100
      select-none`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
