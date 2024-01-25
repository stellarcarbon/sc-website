import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className="h-24 flex flex-col justify-center items-center shadow-md-inverted bg-primary text-accent">
      {/* <hr className="w-[80%] border-secondary" /> */}
      <div className="py-4 grow flex flex-wrap items-center justify-center gap-2 gap-x-8 md:gap-x-12">
        <span className="text-gray-500">© 2023 Stellarcarbon</span>

        {/* <span>Terms of services</span> */}
        <Link href="/privacy-policy">Privacy Policy</Link>
        <a className="underline text-sm" href="mailto:support@stellarcarbon.io">
          support@stellarcarbon.io
        </a>
        <img className="w-6 h-6" src="/x-logo-white.png" />
      </div>
    </div>
  );
}
