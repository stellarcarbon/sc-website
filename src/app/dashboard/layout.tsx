"use client";

import NavBar from "./navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex md:justify-center md:bg-dalle md:bg-cover md:bg-fixed">
      <main className="bg-secondary min-h-[calc(100vh-176px)] md:border border-tertiary flex flex-col items-center justify-start md:max-w-[700px] md:rounded md:m-6 md:w-[70vw]">
        <NavBar />
        {children}
      </main>
    </div>
  );
}
