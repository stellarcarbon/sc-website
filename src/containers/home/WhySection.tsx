import Paragraph from "@/components/Paragraph";
import {
  faLightbulb,
  faMoneyCheckDollar,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WhySection() {
  return (
    <div className="bg-darkest flex flex-col md:flex-row py-12 m-auto w-full px-3 md:px-[5%] shadow-xl z-[10] border-y border-tertiary">
      <div className="grid md:grid-cols-2 w-full ">
        <div className="text-lg">
          <div className="tracking-wide leading-7 text-3xl mb-4 px-4">
            <div>What is Stellarcarbon</div>
            <hr className="mt-4 w-[100px] border-2 border-accentSecondary" />
          </div>
          <Paragraph>
            Stellarcarbon is a platform that lets you easily support high-impact
            biodiversity projects and offset your CO₂ emissions using your
            Stellar wallet. Whether you're an individual or a small business,
            you can contribute directly to protecting rainforests and natural
            ecosystems.
          </Paragraph>
          <Paragraph>
            Supporting climate action shouldn't be complicated. With
            Stellarcarbon, you can contribute to real, verified biodiversity
            projects in just a few clicks — with full transparency and total
            control.
          </Paragraph>
        </div>
        <div className="text-lg md:text-xl flex justify-center items-center tracking-wide leading-7">
          <div className="flex flex-col gap-6 bg-primary mx-4 p-4 md:p-8 rounded-md shadow-md border border-gray-500">
            {/* <div className="self-center text-3xl">Why?</div> */}
            <div className="flex items-center">
              <div className="w-14 flex justify-center">
                <FontAwesomeIcon icon={faTree} />
              </div>
              <div>Join our effort to preserve rainforests</div>
            </div>
            <div className="flex items-center">
              <div className="w-14 flex justify-center">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div>Supereasy to contribute using your wallet</div>
            </div>
            <div className="flex items-center">
              <div className="w-14 flex justify-center">
                <FontAwesomeIcon icon={faMoneyCheckDollar} />
              </div>
              <div>Know exactly where your money is going</div>
            </div>

            {/* <div className="flex items-center">
              <div className="w-14 flex justify-center">
                <FontAwesomeIcon icon={faFileContract} />
              </div>
              <div>Smart contract and HTTP integration options</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
