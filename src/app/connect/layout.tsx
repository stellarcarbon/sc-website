"use client";

import appConfig from "@/config";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return appConfig.demo ? (
    <>{children}</>
  ) : (
    <main className="flex-1 flex flex-col justify-start items-center bg-forestling bg-no-repeat bg-fixed bg-cover">
      <div className="flex-1 md:flex-none md:my-8 w-full md:max-w-[780px] bg-darkest md:rounded md:border md:border-tertiary overflow-hidden">
        {children}
      </div>
    </main>
  );
}
