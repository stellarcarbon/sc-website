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

  const isCurrentRoute = () => {
    if (href === "/dashboard" && pathname.startsWith("/connect")) {
      return true;
    }
    if (href === "/explain/introduction")
      return pathname.startsWith("/explain");
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <Link
      className={`hover:text-alternateLight ${
        isCurrentRoute() ? "text-alternateFull " : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
