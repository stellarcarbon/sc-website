"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-24 flex flex-col justify-center items-center shadow-md-inverted bg-darker text-accent border-t border-t-secondary">
      <div className="py-4 grow flex flex-wrap items-center justify-center gap-2 gap-x-8 md:gap-x-12">
        <span className="text-gray-500">© 2025 Stellarcarbon</span>

        <Link href="/terms-of-use">Terms of Use</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link
          className="underline text-sm"
          href="mailto:support@stellarcarbon.io"
        >
          support@stellarcarbon.io
        </Link>
        <Link href="https://x.com/stellarcarbon" target="_blank">
          <img
            className="w-6 h-6"
            src="/x-logo-white.png"
            alt="X Logo"
          />
        </Link>
      </div>
    </div>
  );
}
