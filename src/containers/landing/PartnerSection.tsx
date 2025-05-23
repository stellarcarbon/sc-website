import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import PartnerLogo, { Partners } from "@/components/PartnerLogo";
import Link from "next/link";
import LandingSection from "./LandingSection";
import LandingSectionHeader from "./LandingSectionHeader";

export default function PartnerSection() {
  const first = (
    <div>
      <LandingSectionHeader>For business</LandingSectionHeader>

      <Paragraph>
        We also provide an API integration for others building on Stellar who
        want to make it easy for their users to contribute to biodiversity or
        compensate for their emissions.
      </Paragraph>

      <Paragraph>
        <Link href="/software" className="underline text-sm">
          Read about integration options here
        </Link>
      </Paragraph>
    </div>
  );

  const second = (
    <div className="flex flex-col items-center justify-center pr-[5%] overflow-x-auto">
      <h1 className="text-3xl font-noto text-center">
        Join our early adopters
      </h1>
      <div className=" w-full overflow-x-auto flex md:gap-6 flex-col items-center md:flex-row">
        {Object.values(Partners).map((partner, idx) => {
          return <PartnerLogo key={`partner_${idx}`} partner={partner} />;
        })}
      </div>
    </div>
  );

  return <LandingSection first={first} second={second} />;
}
