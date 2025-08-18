"use client";

import IconButton from "@/components/IconButton";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RequestCertificateContactDetailsForm from "./RequestCertificateContactDetailsForm";
import {
  RequestCertificateSteps,
  useRequestCertificateContext,
} from "@/context/RequestCertificateContext";
import RequestCertificateInfo from "./RequestCertificateInfo";
import RequestCertificateChoose from "./RequestCertificateChoose";

export default function RequestCertificate() {
  const { showForm, setShowForm } = useInlineContactInfoContext();
  const { step, setStep } = useRequestCertificateContext();

  return (
    <div>
      {step !== RequestCertificateSteps.info && (
        <IconButton
          className="absolute top-[10px] left-[calc(100%-32px)] w-[24px] h-[24px] z-10"
          onClick={() => {
            setShowForm(false);
            setStep(RequestCertificateSteps.info);
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      )}
      {showForm ? (
        <RequestCertificateContactDetailsForm />
      ) : (
        <>
          {step === RequestCertificateSteps.info && <RequestCertificateInfo />}
          {step === RequestCertificateSteps.choose && (
            <RequestCertificateChoose />
          )}
        </>
      )}
    </div>
  );
}
