"use client";

import Banner from "@/components/Banner";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import SCLink from "@/components/SCLink";
import ShipiboImages from "@/components/ShipiboImages";
import Subheader from "@/components/Subheader";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col items-center font-noto bg-darkest">
      <Banner
        title="Current Projects"
        subtitle="Land in the rainforest"
        background="forest-bg"
      />
      <div className="md:pt-10 lg:max-w-[900px] xl:max-w-[1200px]">
        <Header>Our project</Header>
        <Paragraph>
          Our project supports real, on-the-ground rainforest conservation in
          the Peruvian Amazon. By working directly with Indigenous communities,
          we help protect vital ecosystems, preserve endangered species, and
          generate verified carbon credits. The project also creates local jobs
          and supports long-term livelihoods, delivering both environmental and
          humanitarian benefits with measurable, transparent impact.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row grow lg:max-w-[900px] xl:max-w-[1200px]">
        <div className="hidden w-full mb-8 md:flex-1  md:mr-16 xl:flex items-center">
          <ShipiboImages />
        </div>

        <div className="md:flex-1 flex flex-col gap-1">
          <Header>About the project area</Header>

          <Paragraph>
            In the heart of the Peruvian Amazon, the project supports native
            communities working to protect over 127,000 hectares of rainforest
            from deforestation and degradation. This region is home to
            endangered trees like <i>Handroanthus serratifolius</i>, known for
            its vibrant yellow blossoms, and <i>Bertholletia excelsa</i>, the
            Brazil nut tree, which is important for both biodiversity and local
            livelihoods.
          </Paragraph>
          <Paragraph>
            The forest also shelters threatened wildlife, including the giant
            anteater, white bellied spider monkey, and harpy eagle. By
            preserving these ecosystems, we help sustain not only rare species
            but also the cultural heritage of the Cacataibo and Shipibo Conibo
            peoples who call this land home.
          </Paragraph>

          <Paragraph>
            Explore the project areas on{" "}
            <SCLink
              href="https://restor.eco/collections/9bd7ea8c-ca87-4e13-9803-d00f8a59ce92"
              target="_blank"
            >
              Restor
            </SCLink>{" "}
            and check the documentation on{" "}
            <SCLink
              href="https://registry.verra.org/app/projectDetail/VCS/1360"
              target="_blank"
            >
              Verra
            </SCLink>
            .
          </Paragraph>
        </div>
      </div>
      <div className="lg:max-w-[900px] xl:max-w-[1200px]">
        <div>
          <div className="xl:hidden px-4 my-8 mt-16 w-full flex justify-center">
            <div className="max-w-[600px]">
              <ShipiboImages />
            </div>
          </div>
          <Header>Measuring impact</Header>

          <Subheader>Verified Carbon Standard</Subheader>
          <Paragraph>
            Through this initiative, the participating communities are working
            to protect their forests, preserve biodiversity, and generate
            verified carbon credits under the{" "}
            <SCLink
              href="https://offsetguide.org/what-are-carbon-crediting-programs/"
              target="_blank"
            >
              Verified Carbon Standard
            </SCLink>{" "}
            (VCS) and{" "}
            <SCLink
              href="https://www.climate-standards.org/ccb-standards/"
              target="_blank"
            >
              Climate, Community & Biodiversity
            </SCLink>{" "}
            (CCB) standards, contributing to climate change mitigation, the
            safeguarding of the area’s rich biodiversity, and the protection of
            Indigenous livelihoods. Additional information about the CCB can be
            found{" "}
            <SCLink href="https://verra.org/programs/ccbs/" target="_blank">
              here
            </SCLink>
            .
          </Paragraph>
          <Subheader>REDD+</Subheader>
          <Paragraph>
            The project follows the{" "}
            <SCLink
              href="https://unfccc.int/topics/land-use/workstreams/redd/what-is-redd"
              target="_blank"
            >
              REDD+
            </SCLink>{" "}
            methodology . REDD+ stands for Reducing Emissions from Deforestation
            and Forest Degradation, with the “+” referring to the role of
            conservation, sustainable forest management, and enhancement of
            forest carbon stocks in developing countries. {`It's a`} UN-backed
            framework designed to financially reward efforts that protect
            forests and reduce carbon emissions. Key pillars of REDD+ include{" "}
            <b>additionality</b> (ensuring emissions reductions {`wouldn't`}{" "}
            happen without the project), <b>permanence</b> (making sure the
            carbon stays stored over time), and <b>leakage</b> (preventing
            deforestation from simply shifting to another area).
          </Paragraph>

          <Header>Verification links</Header>

          {/* <p className="flex flex-col underline text-accentSecondary"> */}
          <Paragraph>
            <div className="flex flex-col gap-4 mt-2">
              <SCLink
                href="https://registry.verra.org/mymodule/ProjectDoc/Project_ViewFile.asp?FileID=123849&IDKEY=s903q4jsafkasjfu90amnmasdfkaidflnmdf9348r09dmfasdfk170787771"
                target="_blank"
              >
                Progress Monitoring report
              </SCLink>
              <SCLink
                href="https://search.fsc.org/en/certificate/a0240000005sSO8AAM/"
                target="_blank"
              >
                FSC Certificate
              </SCLink>
            </div>
          </Paragraph>
        </div>
      </div>

      {/* Widgets */}
      <div className="max-w-[80%] my-12 flex flex-col md:flex-row justify-center">
        <CountUp
          value={1270}
          unit={"Km2 Area"}
          subject={"Under better management of natural resources."}
        />
        <CountUp
          value={5.2}
          unit={"Km2 Area"}
          subject={
            "Better biophysical conditions within the lands of indigenous communities."
          }
          decimals={1}
        />
        <CountUp
          value={350}
          unit={"Families"}
          subject={
            "Indigenous families with improved livelihoods and economic benefits."
          }
        />
        <CountUp
          value={4}
          unit={"Businesses"}
          subject={
            "Sustainable businesses developed by indigenous communities."
          }
        />
      </div>
      <Footer />
    </main>
  );
}
