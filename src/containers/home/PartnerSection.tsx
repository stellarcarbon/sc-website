import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import PartnerLogo, { Partners } from "@/components/PartnerLogo";
import Link from "next/link";

export default function PartnerSection() {
  return (
    <div className="bg-primary py-12 w-full shadow-xl z-[10]">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between md:items-center h-full w-full">
        {/* Text */}
        <div className="px-3 md:pl-[5%] md:max-w-[40%]">
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
        <div className="mt-8 flex flex-col items-center justify-center pr-[5%]">
          <h1 className="text-3xl font-noto text-center">
            Join our early adopters
          </h1>
          <div className=" w-full overflow-x-auto flex md:gap-6 flex-col items-center md:flex-row">
            {Object.values(Partners).map((partner, idx) => {
              return <PartnerLogo key={`partner_${idx}`} partner={partner} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
