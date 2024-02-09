import { FormStatusMessages } from "@/app/types";
import Button from "@/components/Button";
import FormError from "@/components/FormError";
import ErrorIcon from "@/components/icons/ErrorIcon";
import SignIcon from "@/components/icons/SignIcon";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { Hourglass } from "react-loader-spinner";

interface FormStatusModalProps {
  message: FormStatusMessages;
  submissionError?: string;
  closeModal: () => void;
}

export default function FormStatusModal({
  message,
  submissionError,
  closeModal,
}: FormStatusModalProps) {
  let status;
  if (message === FormStatusMessages.creating) {
    status = (
      <>
        <span className="text-center">{message}</span>
        <div className="my-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#d8def2", "#d8def2"]}
          />
        </div>
      </>
    );
  } else if (message === FormStatusMessages.signTransaction) {
    status = (
      <>
        <span className="text-center">{message}</span>
        <div className="my-4">
          <SignIcon />
        </div>
      </>
    );
  } else if (message === FormStatusMessages.awaitBlockchain) {
    status = (
      <>
        <span className="text-center">{message}</span>
        <div className="my-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#d8def2", "#d8def2"]}
          />
        </div>
      </>
    );
  } else if (message === FormStatusMessages.completed) {
    status = (
      <>
        <span className="text-center">{message}</span>
        <div className="">
          <SuccessIcon />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600 opacity-80 z-10"></div>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
        <div className="flex flex-col p-8 justify-between items-center bg-primary w-[80%] md:w-[400px] lg:w-[30%] h-[60%] lg:h-[50%] opacity-100 shadow-xl rounded-md">
          <span className="text-2xl">Transaction status</span>
          {submissionError ? (
            <>
              <FormError className="text-center">{submissionError}</FormError>
              <ErrorIcon />
            </>
          ) : (
            status
          )}
          <Button
            disabled={
              (message === FormStatusMessages.creating ||
                message === FormStatusMessages.signTransaction) &&
              !submissionError
            }
            onClick={() => {
              closeModal();
            }}
          >
            Return to dashboard
          </Button>
        </div>
      </div>
    </>
  );
}
