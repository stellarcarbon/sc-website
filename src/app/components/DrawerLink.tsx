import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAppContext } from "../context/appContext";

interface DrawerLinkProps {
  children: ReactNode;
  href: string;
}

export default function DrawerLink({ children, href }: DrawerLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isCurrentRoute = () => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`p-4 font-bold 
    ${
      isCurrentRoute()
        ? "text-yellow-400"
        : `${pathname.includes("/wallet") ? "text-accent" : "text-gray-500"}`
    }
    `}
      onClick={() => {
        router.push(href);
      }}
    >
      {children}
    </div>
  );
}