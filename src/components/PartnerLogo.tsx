export enum Partners {
  PUBLICNODE = "/publicnode.png",
  MOZART = "/mozart-pay.png",
  CFCE = "/cfce.jpeg",
  MOJOFLOWER = "/mojoflower.png",
}

interface PartnerLogoProps {
  partner: Partners;
}

export default function PartnerLogo({ partner }: PartnerLogoProps) {
  return (
    <div className="my-8 w-[240px] h-[80px] flex-shrink-0 flex items-center justify-center">
      <img
        className=""
        src={partner}
        alt={`${partner.replace(".png", "")} partner logo`}
      />
    </div>
  );
}
