import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import { useSinkFormContext } from "@/context/SinkFormContext";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function RequestCertificateChoose() {
  const { walletConnection, totalPending, retirementGraceDays } =
    useAppContext();
  const { overrideFormValues } = useSinkFormContext();

  const router = useRouter();

  const remainingFraction = useMemo(() => {
    return Math.ceil(totalPending) - totalPending;
  }, [totalPending]);

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="relative flex w-full justify-center">
        <h2 className="text-lg md:text-xl font-semibold">
          Requesting a certificate
        </h2>
      </div>
      <div className="flex justify-around w-full">
        <div className="px-4">
          <div className="font-bold">E-mail</div>

          <div className="break-all whitespace-normal">
            <div>{walletConnection?.recipient?.email}</div>
          </div>
        </div>
        <div className="px-4">
          <div className="font-bold">Name</div>
          <div className="break-all whitespace-normal">
            {walletConnection?.recipient?.name}
          </div>
        </div>
      </div>
      <span className="">
        To create a personalized certificate we have to submit a whole number of
        CARBON (
        <CARBONCurrencyIcon className="inline" />) to the Verra Registry. Your
        options are the following:
      </span>
      {/* <span className="self-start">Your options:</span> */}
      <>
        <ul className="list-disc ml-4">
          {totalPending < 1 ? (
            <li>Sink an additional {remainingFraction.toFixed(3)} tons.</li>
          ) : (
            <>
              <li>
                Request a certificate for {Math.ceil(totalPending)}{" "}
                <CARBONCurrencyIcon className="inline" /> by sinking an
                additional {remainingFraction.toFixed(3)} tons.
              </li>
              <li>
                {" "}
                {totalPending > 1 && (
                  <span>
                    Alternatively, you can round down and request a certificate
                    for {Math.floor(totalPending)}{" "}
                    <CARBONCurrencyIcon className="inline" />. The remaining{" "}
                    <CARBONCurrencyIcon className="inline" /> will retire into a
                    community certificate.
                  </span>
                )}
              </li>
            </>
          )}
          <li>
            {`Do nothing. Your transaction will be retired into a community
                certificate within ${retirementGraceDays} days of the transaction date.`}
          </li>
        </ul>
      </>
      <span className="">
        Creating a personal certificate at the Verra Registry is completely
        optional. All CARBON transactions will eventually be retired using
        community certificates.
      </span>
      <div className="flex flex-wrap justify-around gap-4 w-full">
        <Button
          onClick={() =>
            overrideFormValues(undefined, remainingFraction, undefined)
          }
          className="text-sm"
        >
          <div className="flex items-center">
            Add {remainingFraction.toFixed(3)}
            <CARBONCurrencyIcon className="inline ml-1" />
          </div>
        </Button>
        <Button
          className="text-sm"
          disabled={totalPending < 1}
          onClick={() => {
            router.push("/sink/rounding");
          }}
        >
          <div className="flex items-center">
            Round down to {Math.floor(totalPending).toFixed(3)}
            <CARBONCurrencyIcon className="inline ml-1" />
          </div>
        </Button>
      </div>
    </div>
  );
}
