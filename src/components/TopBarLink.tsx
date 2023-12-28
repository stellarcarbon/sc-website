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
  const isCurrentRoute = () => pathname === href;

  return (
    <Link
      className={`${isCurrentRoute() ? "text-yellow-400" : "text-gray-500"}`}
      href={href}
    >
      {children}
    </Link>
  );
}
