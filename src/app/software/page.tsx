"use client";
import ContentContainer from "@/components/ContentContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import appConfig from "@/config";
import Link from "next/link";

export default function SoftwarePage() {
  return (
    <main className="flex flex-col items-center font-noto">
      <div className="blockchain-bg w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[7vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            Software
          </span>
          <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            For integration partners
          </span>
        </div>
      </div>

      <ContentContainer>
        <Paragraph>
          At Stellarcarbon, we believe in transparency, accessibility, and
          innovation to fund nature-based solutions. Our open-source software
          empowers businesses and developers to seamlessly integrate eco-credits
          into their workflows using distributed ledger technology. Below is an
          overview of our core software components.
        </Paragraph>

        <Header>Stellarcarbon API</Header>
        <Paragraph>
          The public interface of our backend allows anyone to create sinking
          transactions via simple HTTP requests. This API is ideal for
          developers and businesses looking to integrate CO₂ compensation into
          their existing products. It is permissionless: you don&apos;t need an
          API key. We publish an OpenAPI schema which can be used to
          automatically generate API clients for many programming languages,
          making your integration easy to set up and maintain.
        </Paragraph>
        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>
                Get quotes, build sinking transactions, and manage user
                accounts.
              </span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>FastAPI, Stellar.</span>
            </li>
            <li className="mb-2">
              <b>Use cases: </b>
              <span>
                User-facing integrations, and embedding nature-positive
                contributions into internal business processes.
              </span>
            </li>
          </ul>
          <div className="my-6">
            <Link
              className="underline"
              href={`${appConfig.apiBaseUrl}/docs`}
              target="_blank"
            >
              View API documentation
            </Link>
          </div>
        </Paragraph>

        <Header>Stellarcarbon Audit</Header>
        <Paragraph>
          To enhance transparency and give users full confidence in our carbon
          accounting process, we offer an open-source auditing tool available on
          GitHub. This tool allows anyone to independently verify our carbon
          balance, track the lifecycle of CARBON and CarbonSINK tokens, and
          monitor the integrity of our sinking mechanism on the Stellar
          blockchain. We also use it ourselves behind the scenes to power our
          API.
        </Paragraph>

        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>Monitor Stellarcarbon balances and transactions.</span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>SQLAlchemy, Docker.</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>
                Provide an additional layer of accountability for all
                stakeholders.
              </span>
            </li>
          </ul>
          <div className="my-6">
            <Link
              className="underline"
              href="https://github.com/stellarcarbon/sc-audit#readme-ov-file"
              target="_blank"
            >
              View code repository
            </Link>
          </div>
        </Paragraph>

        <Header>Sorocarbon</Header>
        <Paragraph>
          Sorocarbon is a Soroban-based integration that offers a decentralized
          alternative to our HTTP API for sinking carbon. It enables direct
          smart contract interactions, making it a powerful choice for
          developers requiring deep integration. Call our{" "}
          <code className="bg-tertiary">sink_carbon</code> method from your own
          contracts, and complement this with the Stellarcarbon API in your
          frontend.
        </Paragraph>
        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>Sink carbon directly from smart contracts.</span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>Soroban, Mercury Retroshades.</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>Embed Stellarcarbon into your dApp or DeFi protocol.</span>
            </li>
          </ul>
          <div className="my-6">
            <Link
              className="underline"
              href="https://github.com/stellarcarbon/sorocarbon#readme-ov-file"
              target="_blank"
            >
              View code repository
            </Link>
          </div>
        </Paragraph>

        <Header>Stellarcarbon Website</Header>
        <Paragraph>
          Our web app is the heart of the Stellarcarbon experience for our
          retail audience, providing an intuitive interface through which they
          contribute to biodiversity and climate action, and track their impact.
          It is the website you are visiting right now.
        </Paragraph>
        <Paragraph>
          <ul className="list-disc ml-4">
            <li className="mb-2">
              <b>Functionality: </b>
              <span>
                Eco-credit retirement, user dashboard, transaction history.
              </span>
            </li>
            <li className="mb-2">
              <b>Technology: </b>
              <span>React, Stellarcarbon API.</span>
            </li>
            <li className="mb-2">
              <b>Use case: </b>
              <span>
                Have a positive impact on climate and biodiversity, with one-off
                or recurring contributions to vetted impact projects.
              </span>
            </li>
          </ul>
          <div className="my-6">
            <Link
              className="underline"
              href="https://github.com/stellarcarbon/sc-website#readme-ov-file"
              target="_blank"
            >
              View code repository
            </Link>
          </div>
        </Paragraph>
      </ContentContainer>
      <Footer />
    </main>
  );
}
