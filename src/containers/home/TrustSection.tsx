import Paragraph from "@/components/Paragraph";
import {
  faFileContract,
  faLightbulb,
  faMoneyCheckDollar,
  faReceipt,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WhySection() {
  return (
    <div className="bg-darkest flex flex-col md:flex-row py-12 m-auto w-full px-3 md:px-[5%] shadow-xl z-[10] border-y border-tertiary">
      <div className="grid md:grid-cols-2 w-full ">
        <div className="text-lg">
          <div className="tracking-wide leading-7 text-3xl mb-4 px-4">
            <div>Trustworthy</div>
            <hr className="mt-4 w-[100px] border-2 border-accentSecondary" />
          </div>
          <Paragraph>
            Transparency is essential when it comes to climate action. That’s
            why we only work with projects issuing Verified Carbon Units (VCUs)
            and use blockchain technology to ensure every transaction is
            transparent and traceable.
          </Paragraph>
          <Paragraph>
            VCUs are issued through the Verra Registry, the world’s leading
            standard for certifying voluntary carbon offset projects. Each VCU
            represents one metric ton of CO₂ reduced or removed from the
            atmosphere. By supporting only Verra-verified projects, we ensure
            your contribution goes to initiatives with proven environmental
            benefits.
          </Paragraph>
        </div>
        <div className="text-lg md:text-xl flex justify-center items-center tracking-wide leading-7">
          <div className="flex flex-col gap-6 bg-primary mx-4 p-4 md:p-8 rounded-md shadow-md border border-gray-500">
            <div className="flex items-center">
              <div className="w-14 flex justify-center">
                <FontAwesomeIcon icon={faFileContract} />
              </div>
              {/* <div>
                All contributions are public & verifiable on the Stellar
                blockchain
              </div> */}
              <div>Full transparancy using blockchain</div>
            </div>
            <div className="flex items-center">
              <div className="w-14 flex justify-center">
                <FontAwesomeIcon icon={faReceipt} />
              </div>
              <div>{`Only Verified Carbon Units (VCU's)`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
