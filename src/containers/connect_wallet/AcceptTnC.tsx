import FormError from "@/components/FormError";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ConnectWalletFormError } from "./ConnectWalletForm";
import Link from "next/link";

export default function AcceptTnC() {
  const { tncError, tncAccepted, setTncAccepted } = useConnectWalletContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <DashboardHeader>Fine print</DashboardHeader>
        <span>
          Read our <Link href="#" className="underline">
            Terms of Use
          </Link> and <Link href="/privacy-policy" target="_blank" className="underline">
            Privacy Policy
          </Link> before you continue.
        </span>
      </div>

      {tncError && (
        <ConnectWalletFormError
          message={"You have to accept the terms and conditions."}
        />
      )}

      <div
        className={`my-2 !cursor:pointer pl-2 gap-2 flex items-center font-bold border rounded-md 
        ${
          tncAccepted
            ? "bg-primary border-accentSecondary"
            : "bg-secondary border-gray-700"
        }
        `}
      >
        <input
          className="w-5 h-5"
          type="checkbox"
          checked={tncAccepted}
          onChange={() => setTncAccepted(!tncAccepted)}
          id="checkbox_policy"
        />
        <label
          className="p-2 cursor-pointer text-sm "
          htmlFor="checkbox_policy"
        >
          I have read and agree with the Terms of Use and the Privacy
          Policy.
        </label>
      </div>
    </div>
  );
}
