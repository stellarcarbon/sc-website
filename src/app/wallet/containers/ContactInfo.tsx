import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormError from "../components/FormError";
import Button from "../components/Button";
import { useAppContext } from "@/app/context";
import DisconnectWalletButton from "../components/DisconnectWalletButton";
import PubKeyDisplay from "../components/PubKeyDisplay";

type Inputs = {
  username: string;
  useremail: string;
};

export default function ContactInfo() {
  const { setPersonalDetails, setAnonymous } = useAppContext();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setPersonalDetails(data);
  };

  const skipSubmit = () => {
    // clearErrors();
    setAnonymous();
  };

  return (
    <>
      <PubKeyDisplay />

      <form className="flex flex-col gap-2 pb-10 w-[60%] items-center">
        <p>
          Add your contact details to receive email confirmation of your
          transactions.
        </p>
        <input
          className="w-full"
          type="text"
          defaultValue="test_username"
          {...register("username", { required: "Username is required" })}
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <FormError key={type}>{message}</FormError>
            ))
          }
        />

        <input
          className="w-full"
          type="text"
          defaultValue="test_useremail@stellarcarbon"
          {...register("useremail", {
            required: "Email address is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email format",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="useremail"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <FormError key={type}>{message}</FormError>
            ))
          }
        />
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            disabled={Object.keys(errors).length > 0}
          >
            Submit & Continue
          </Button>
          <span>or</span>
          <Button onClick={skipSubmit}>Continue anonymous</Button>
        </div>
      </form>
      <DisconnectWalletButton />
    </>
  );
}
