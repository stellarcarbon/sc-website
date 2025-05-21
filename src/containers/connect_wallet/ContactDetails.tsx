import FormError from "@/components/FormError";
import ContactInfoForm from "../ContactInfoForm";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ContactDetails() {
  const { emailError } = useConnectWalletContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <DashboardHeader>Fill in contact details (optional)</DashboardHeader>

        <span className="">
          Your contact details will be used to send you a confirmation of your
          purchases. This step is optional.
        </span>
      </div>

      <ContactInfoForm />

      {emailError && <FormError>{"Invalid email address"}</FormError>}
    </div>
  );
}
