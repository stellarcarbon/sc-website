import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import PartnerLogo, { Partners } from "@/components/PartnerLogo";
import Link from "next/link";

export default function PartnerSection() {
  return (
    <div className="bg-secondary pt-4 pb-12 w-full border-y border-y-tertiary">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row h-full w-full">
        {/* Text */}
        <div className="m-auto px-3 md:pl-[5%] md:w-[50%]">
          <Header>For business</Header>

          <Paragraph>
            We also provide an API integration for others building on Stellar
            who want to make it easy for their users to contribute to
            biodiversity or compensate for their emissions.
          </Paragraph>

          <Paragraph>
            <Link href="/software" className="underline text-sm">
              Read about integration options here
            </Link>
          </Paragraph>
        </div>

        {/* Partners */}
        <div className="mt-8 md:mt-0 md:flex-1 md:max-w-[50%] md:min-h-[300px] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-noto text-center">
            Join our early adopters
          </h1>
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-4 items-center justify-around w-full">
            {Object.values(Partners).map((partner, idx) => {
              return <PartnerLogo key={`partner_${idx}`} partner={partner} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
