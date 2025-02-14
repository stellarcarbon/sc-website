import TextInput from "@/components/TextInput";
import FormError from "@/components/FormError";
import { useConnectWalletContext } from "./connect_wallet/ConnectWalletContext";

export default function ContactInfoForm() {
  const { username, setUsername, useremail, setUseremail } =
    useConnectWalletContext();

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const useremailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseremail(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <label className="text-xs" htmlFor="username">
        Name
      </label>
      <TextInput
        name="username"
        placeholder="Your name"
        value={username}
        onChange={usernameOnChange}
      />

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
  );
}
