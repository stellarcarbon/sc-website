"use client";

import Codeblock from "@/components/Codeblock";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import Subheader from "@/components/Subheader";

export default function ExplainIntegrationPage() {
  return (
    <div className="flex flex-col">
      <Header>Stellarcarbon for business</Header>
      <Paragraph>
        Enable your product or platform to automatically channel value into
        regenerative impact projects. Whether you run a web app, mobile
        dApp, or backend service on Stellar, you can integrate carbon-sinking
        with just a few lines of code. Let every transaction your users make also
        contribute to nature.
      </Paragraph>

      <Subheader>HTTP API integration</Subheader>
      <Paragraph>
        Request a sinking transaction from our API and sign it with your company
        wallet or let your customer sign it with theirs. You choose what fits
        best. Use our official <SCLink
          href="https://github.com/stellarcarbon/sc-sdk-typescript"
          target="_blank"
        >
          Typescript SDK
        </SCLink>, or generate your own from the <SCLink
          href="https://api.stellarcarbon.io/docs"
          target="_blank"
        >
          OpenAPI Specification
        </SCLink>.
      </Paragraph>

      <Subheader>Soroban smart contract integration</Subheader>
      <Paragraph>
        If you use smart contracts in your workflow, it takes just a couple of
        lines to sink CARBON:
        <Codeblock>
{`let sink_client = sink_contract::Client::new(&env, &sink_contract_id);
sink_client.sink_carbon(funder, recipient, amount, project_id, memo_text);`}
        </Codeblock>
        Read more about our open-source components on the <SCLink
          href="/software"
        >
          software page
        </SCLink>.
      </Paragraph>

      <Subheader>Contact us</Subheader>
      <Paragraph>
        We are happy to offer support while you integrate Stellarcarbon into your
        workflows. Just send us an email at{" "}
        <SCLink href={"mailto:admin@stellarcarbon.io"}>
          admin@stellarcarbon.io
        </SCLink>
        .
      </Paragraph>
    </div>
  );
}
