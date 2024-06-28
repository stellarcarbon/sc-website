import TextInput from "@/components/TextInput";
import FormError from "../components/FormError";

interface ContactInfoFormProps {
  username: string;
  setUsername: (name: string) => void;
  useremail: string;
  setUseremail: (name: string) => void;
  emailError: boolean;
}

export default function ContactInfoForm({
  username,
  useremail,
  setUsername,
  setUseremail,
  emailError,
}: ContactInfoFormProps) {
  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const useremailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseremail(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 items-start md:px-8">
      <label className="text-xs" htmlFor="username">
        Username
      </label>
      <TextInput
        name="username"
        placeholder="Your name"
        value={username}
        onChange={usernameOnChange}
      />

      <label className="text-xs" htmlFor="useremail">
        Email
      </label>
      <TextInput
        name="useremail"
        placeholder="Your email address"
        value={useremail}
        onChange={useremailOnChange}
      />
      {emailError && (
        <FormError className="ml-4 !py-1">{"Invalid email address"}</FormError>
      )}
    </div>
  );
}
