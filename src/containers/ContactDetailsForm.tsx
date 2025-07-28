import SectionHeader from "@/components/SectionHeader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ConnectWalletFormError } from "./connect_wallet/ConnectWalletForm";
import { useContactDetailsContext } from "@/context/ContactDetailsContext";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useCallback } from "react";
import { useAppContext } from "@/context/appContext";
import { validateEmail } from "@/utils";
import { useRouter } from "next/navigation";

export default function ContactDetailsForm() {
  const { updateWalletConnection } = useAppContext();
  const {
    username,
    setUsername,
    useremail,
    setUseremail,
    emailError,
    setEmailError,
  } = useContactDetailsContext();

  const router = useRouter();

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const useremailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseremail(event.target.value);
  };

  const validateForm = useCallback(() => {
    let emailErr: boolean = false;
    if (useremail === "") {
      emailErr = true;
    } else {
      emailErr = !validateEmail(useremail);
    }

    if (emailErr) {
      setEmailError(emailErr);
      return false;
    }

    return true;
  }, [useremail, setEmailError]);

  const onSubmit = useCallback(() => {
    setEmailError(false);

    if (!validateForm()) return;

    updateWalletConnection(false, { username, useremail });
    router.push("/dashboard");
  }, [
    username,
    useremail,
    updateWalletConnection,
    validateForm,
    setEmailError,
    router,
  ]);

  const onSkip = useCallback(() => {
    setEmailError(false);

    updateWalletConnection(true);
    router.push("/dashboard");
  }, [setEmailError, updateWalletConnection, router]);

  return (
    <div className="flex-1 md:flex-none md:my-8 w-full md:max-w-[780px] bg-darkest md:rounded md:border md:border-tertiary overflow-hidden">
      <SectionHeader>
        <div className="text-center text-2xl w-full">Contact details</div>
      </SectionHeader>
      <div className="p-3 py-6 pb-12 md:p-6 flex flex-col gap-9">
        <div>
          Please add your contact details so we can send you certificates.
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <DashboardHeader>Contact details (optional)</DashboardHeader>

            <span className="">
              Your contact details will be used to send you a confirmation of
              your purchases. This step is optional.
            </span>
          </div>

          {emailError && (
            <ConnectWalletFormError message={"Invalid email address"} />
          )}

          <div className="flex flex-col gap-3 items-start mx-1 md:mx-0 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-xs" htmlFor="username">
                Name
              </label>
              <TextInput
                name="username"
                placeholder="Your name"
                value={username}
                onChange={usernameOnChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-xs" htmlFor="useremail">
                E-mail
              </label>
              <TextInput
                name="useremail"
                placeholder="Your email address"
                value={useremail}
                onChange={useremailOnChange}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={onSkip}>Skip</Button>
            <Button onClick={onSubmit}>Save contact details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
