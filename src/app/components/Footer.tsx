import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col items-center  shadow-md-inverted
    ${pathname.includes("/wallet") ? "bg-primary text-accent" : ""}
    `}
    >
      <hr
        className={` w-[80%]
      ${pathname.includes("/wallet") ? "border-secondary" : "border-gray-50"}
      `}
      />
      <div className="flex flex-wrap items-center justify-center my-6 gap-4 gap-x-8 md:gap-x-12">
        <span className="text-gray-500">© 2023 Stellarcarbon</span>

        <span>Terms of services</span>
        <span>Privacy Policy</span>
        <span className="text-sm">support@stellarcarbon.io</span>
        <img
          className="w-6 h-6"
          src={`${
            pathname.includes("/wallet")
              ? "/x-logo-white.png"
              : "/x-logo-black.png"
          }`}
        />
      </div>
    </div>
  );
}
