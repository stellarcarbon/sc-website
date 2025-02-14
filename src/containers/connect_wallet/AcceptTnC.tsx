import FormError from "@/components/FormError";
import { useConnectWalletContext } from "./ConnectWalletContext";

export default function AcceptTnC() {
  const { tncError, tncAccepted, setTncAccepted } = useConnectWalletContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold">Privacy policy</h1>
        <span className="text-xs md:text-sm max-w-[80%]">
          Read about our terms & conditions and privacy policy <u>here</u>.
        </span>
      </div>

      <div
        className={`!cursor:pointer pl-2 gap-2 flex items-center font-bold border rounded-md 
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
          I have read and agree with the terms & conditions and the privacy
          policy.
        </label>
      </div>

      {tncError && (
        <FormError>{"You have to accept the terms and conditions."}</FormError>
      )}
    </div>
  );
}
