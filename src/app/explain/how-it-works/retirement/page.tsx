"use client";

import Header from "@/components/Header";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Paragraph from "@/components/Paragraph";
import Subheader from "@/components/Subheader";

export default function ExplainRetirementPage() {
  return (
    <div className="flex flex-col">
      <Header>Retirement process</Header>
      <Paragraph>
        When users sink <CARBONCurrencyIcon className="inline" />, an equal
        amount of VCUs in the Verra Registry has to be retired. After retiring
        VCUs on Verra, a certificate is generated that can be added your
        personal or business balance sheet to prove you have contributed to
        global climate goals or have compensated for your own unabated emissions.
      </Paragraph>
      <Subheader>What is a retirement?</Subheader>
      <Paragraph>
        Retiring a VCU permanently removes it from circulation, turning it from
        transferable inventory into an exclusive, claimable one-ton CO₂e
        reduction on your balance sheet. Until {`it's`} retired, a VCU remains merely
        a tradable instrument with no impact on {`anyone's`} carbon accounting.
      </Paragraph>
      <Subheader>Fractional retirements</Subheader>
      <Paragraph>
        Retirement in the Verra Registry only happens in whole units, but
        Stellarcarbon also provides the option to make fractional retirements.
        We allow users to do a transaction of 1.5 tons for example, which
        is not possible on Verra directly. Stellarcarbon built a mechanism that
        retires the fractions that remain pending for some time into a community
        certificate.
      </Paragraph>
      <div className="py-8">
        <img
          className="max-w-[80%] mx-auto"
          src="/explain_retirement.png"
          alt="retirement process"
        />
        <em className="block text-center text-sm text-tertiary mt-1">
          Fractional transactions are eventually retired into a
          community certificate.
        </em>
      </div>
    </div>
  );
}
