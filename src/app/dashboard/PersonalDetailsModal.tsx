import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { useAppContext } from "@/context/appContext";
import { useState } from "react";

export default function PersonalDetailsModal() {
  const { updateWalletConnection, walletConnection } = useAppContext();

  const [formUsername, setFormUsername] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUsername(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormEmail(event.target.value);
  };

  const isValidEmail = (addr: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(addr);
  };

  const submitForm = () => {
    if (!isValidEmail(formEmail)) {
      setFormError("Invalid email address");
      return;
    }

    updateWalletConnection({
      username: formUsername,
      useremail: formEmail,
    });
  };

  return (
    <Modal>
      <div className="p-4 flex flex-col gap-12 justify-center items-center">
        <span>Edit personal details</span>
        <div className="flex flex-col gap-3 w-[95%] md:w-[70%]">
          <TextInput
            name="username"
            placeholder="Your name"
            value={formUsername}
            onChange={onUsernameChange}
          />
          <TextInput
            name="useremail"
            placeholder="Your email address"
            value={formEmail}
            onChange={onEmailChange}
          />
        </div>
        <Button onClick={submitForm} className="w-[200px]">
          Update contact info
        </Button>
        {formError && <div className="text-red-500">{formError}</div>}
      </div>
    </Modal>
  );
}
