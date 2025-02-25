"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TopBarLinkProps = {
  href: string;
  children: ReactNode;
};

export default function TopBarLink({ children, href }: TopBarLinkProps) {
  const pathname = usePathname();
  // Define a function to check if the given path is the current route
  const isCurrentRoute = () => {
    if (href === "/dashboard" && pathname.startsWith("/wallet")) {
      return true;
    }
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <Link
      className={`hover:text-yellow-100 ${
        isCurrentRoute() ? "text-yellow-400" : "text-accent"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
