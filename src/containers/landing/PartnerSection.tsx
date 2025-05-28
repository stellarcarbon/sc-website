import Paragraph from "@/components/Paragraph";
import PartnerLogo, { Partners } from "@/components/PartnerLogo";
import Link from "next/link";
import LandingSection from "./LandingSection";

export default function PartnerSection() {
  const first = (
    <div>
      <div className="px-4 text-4xl font-bold leading-tight tracking-light mb-2">
        For business
      </div>
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
    <div className="w-full flex flex-col items-start justify-center overflow-x-auto px-4">
      <h1 className="text-2xl font-noto">Join our early adopters</h1>
      <div className=" w-full overflow-x-auto flex md:gap-6 flex-col items-center md:flex-row">
        {Object.values(Partners).map((partner, idx) => {
          return <PartnerLogo key={`partner_${idx}`} partner={partner} />;
        })}
      </div>
    </div>
  );

  return <LandingSection first={first} second={second} />;
}
