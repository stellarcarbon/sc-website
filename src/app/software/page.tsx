import ContentContainer from "@/components/ContentContainer";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";

export default function SoftwarePage() {
  return (
    <main className="flex flex-col items-center font-noto pb-16">
      <div className="blockchain-bg w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[7vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            Software
          </span>
          <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            Open source ecosystem
          </span>
        </div>
      </div>

      <ContentContainer>
        <Paragraph>
          At Stellarcarbon, we believe in transparency, accessibility, and
          innovation in CO2 compensation. Our open-source software ecosystem
          empowers individuals and businesses to seamlessly integrate carbon
          compensation into their workflows using blockchain technology. Below
          is an overview of our core software components.
        </Paragraph>

        <Header>Stellarcarbon API</Header>
        <Paragraph>
          Our public backend allows anyone to create sinking transactions via
          simple HTTP requests. This API is ideal for developers and businesses
          looking to integrate CO2 compensation into their existing systems.
        </Paragraph>
        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>Create and manage sinking transactions</span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>FastAPI</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>Website integration options developers</span>
            </li>
          </ul>
          <div className="underline cursor-pointer my-6">View repository</div>
        </Paragraph>

        <Header>Stellarcarbon Audit</Header>
        <Paragraph>
          Stellarcarbon Audit ensures full transparency by verifying the
          balances and transactions within our ecosystem. This tool provides an
          additional layer of accountability for all stakeholders.
        </Paragraph>

        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>Audits Stellarcarbon balances and transactions</span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>???</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>Ensuring trust and transparency</span>
            </li>
          </ul>
          <div className="underline cursor-pointer my-6">View repository</div>
        </Paragraph>

        <Header>Sorocarbon</Header>
        <Paragraph>
          Sorocarbon is a Soroban-based integration that offers a decentralized
          alternative to our HTTP API. It enables direct blockchain
          interactions, making it a powerful choice for businesses requiring
          deep integration.
        </Paragraph>
        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>Blockchain-native integration for CO2 sinking</span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>Soroban smart contracts on Stellar</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>Heavyweight B2B integration, bypassing the HTTP API</span>
            </li>
          </ul>
          <div className="underline cursor-pointer my-6">View repository</div>
        </Paragraph>

        <Header>Stellarcarbon Website</Header>
        <Paragraph>
          Our web application is the heart of the Stellarcarbon experience,
          providing an intuitive interface for users to compensate for their CO2
          emissions and track their history. It is the website you are visiting
          right now.
        </Paragraph>
        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>CO2 compensation, user dashboard, transaction history</span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>React</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>
                Individual users looking for an easy way to offset their carbon
                footprint
              </span>
            </li>
          </ul>
          <div className="underline cursor-pointer my-6">View repository</div>
        </Paragraph>
      </ContentContainer>
    </main>
  );
}
