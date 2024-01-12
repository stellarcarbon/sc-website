"use client";

import { useParams } from "next/navigation";
export default function TransactionDetailPage() {
  const params = useParams();

  return (
    <main className="flex flex-col bg-secondary min-h-[calc(100vh-176px)]">
      {params.id}
    </main>
  );
}
