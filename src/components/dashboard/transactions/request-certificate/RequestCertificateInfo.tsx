import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import SCLink from "@/components/SCLink";
import { useAppContext } from "@/context/appContext";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import {
  RequestCertificateSteps,
  useRequestCertificateContext,
} from "@/context/RequestCertificateContext";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function RequestCertificateInfo() {
  const {
    walletConnection,
    retirementGraceDays,
    jwt,
    setSep10Target,
    totalPending,
  } = useAppContext();
  const { setStep } = useRequestCertificateContext();
  const { setShowForm } = useInlineContactInfoContext();

  const router = useRouter();

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-center">
        You have sufficient balance to create a personal certificate of{" "}
        {Math.floor(totalPending)} <CARBONCurrencyIcon className="inline" />
      </div>

      <Button
        className="self-center"
        onClick={() => {
          if (jwt) {
            if (!walletConnection?.recipient) {
              setShowForm(true);
            }
            setStep(RequestCertificateSteps.choose);
          } else {
            setSep10Target("rounding");
            router.push("/sep10");
          }
        }}
      >
        <FontAwesomeIcon icon={faFileLines} />
        Request certificate
      </Button>
    </div>
  );
}
