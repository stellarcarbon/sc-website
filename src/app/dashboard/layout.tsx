"use client";

import NavBar from "./navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start min-h-[calc(100vh-176px)]">
      <NavBar />
      <div className="w-full">{children}</div>
    </main>
  );
}
