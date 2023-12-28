import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      Home
      <Link className="underline" href="/wallet">
        Wallet Page
      </Link>
    </main>
  );
}
