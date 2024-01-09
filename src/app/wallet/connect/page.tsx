"use client";

import SelectWallet from "../containers/SelectWallet";

export default function Connect() {
  return (
    <main className="flex flex-col bg-primary items-center justify-start md:py-6 min-h-[calc(100vh-176px)]">
      <SelectWallet />
    </main>
  );
}
