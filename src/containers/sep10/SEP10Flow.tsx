import { useSEP10Context } from "@/context/SEP10Context";
import { SEP10Steps } from "@/hooks/useSEP10";
import FetchingSEP10 from "./FetchingSEP10";
import AwaitingSEP10 from "./AwaitingSEP10";
import SigningSEP10 from "./SigningSEP10";
import SuccessSEP10 from "./SuccessSEP10";
import Modal from "@/components/Modal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorSEP10 from "./ErrorSEP10";

export default function SEP10Flow() {
  const { step, signChallenge, error } = useSEP10Context();
  const [targetHref, setTargetHref] = useState<string>("/dashboard");

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (redirect === "rounding") {
      setTargetHref("/sink/rounding");
    }
  }, [redirect]);

  return (
    <Modal>
      {" "}
      {error ? (
        <ErrorSEP10 />
      ) : step === SEP10Steps.fetchingChallenge ? (
        <FetchingSEP10 />
      ) : step === SEP10Steps.awaitingAuthentication ? (
        <AwaitingSEP10 signChallenge={signChallenge} />
      ) : step === SEP10Steps.signingChallenge ? (
        <SigningSEP10 />
      ) : step === SEP10Steps.success ? (
        <SuccessSEP10 targetHref={targetHref} />
      ) : null}
    </Modal>
  );
}
