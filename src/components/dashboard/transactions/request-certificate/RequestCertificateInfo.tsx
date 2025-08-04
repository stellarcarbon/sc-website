import Button from "@/components/Button";
import SCLink from "@/components/SCLink";
import { useAppContext } from "@/context/appContext";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import {
  RequestCertificateSteps,
  useRequestCertificateContext,
} from "@/context/RequestCertificateContext";
import { useRouter } from "next/navigation";

export default function RequestCertficateInfo() {
  const { walletConnection, retirementGraceDays, jwt, setSep10Target } =
    useAppContext();
  const { setStep } = useRequestCertificateContext();
  const { setShowForm } = useInlineContactInfoContext();

  const router = useRouter();

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold">
        Create a personal certificate
      </h2>
      <span className="text-center">
        {`Any pending retirements will automatically retire into the community
           pool after ${retirementGraceDays} days, which means you can no longer attain a personal
           certificate.`}
      </span>

      <span className="text-center">
        If you want to request a personal certificate you have to do so before
        this period ends.
      </span>

      <span className="text-center">
        Read more about retirements & certificates{" "}
        <SCLink href="/explain/how-it-works/retirement">here</SCLink>.
      </span>

      <Button
        className="w-[250px]"
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
        Request certificate
      </Button>
    </>
  );
}
