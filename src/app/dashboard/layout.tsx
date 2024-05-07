"use client";

import NavBar from "./navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex md:justify-center md:bg-dalle md:bg-cover">
      <main className="flex flex-col items-center justify-start min-h-[calc(100vh-176px)] lg:min-w-[1024px] md:max-w-[1600 px] bg-secondary">
        <NavBar />
        {children}
      </main>
    </div>
  );
}
