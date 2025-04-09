export enum Partners {
  MOJOFLOWER = "/mojoflower.png",
  PUBLICNODE = "/publicnode.png",
  CFCE = "/cfce.jpeg",
}

interface PartnerLogoProps {
  partner: Partners;
}

export default function PartnerLogo({ partner }: PartnerLogoProps) {
  return (
    <div className="my-8 w-[240px] h-[80px] flex items-center justify-center">
      <img
        className=""
        src={partner}
        alt={`${partner.replace(".png", "")} partner logo`}
      />
    </div>
  );
}
