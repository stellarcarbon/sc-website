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
    <div className="flex flex-col gap-1 pl-8 mt-2 items-start w-[85%]">
      <label className="text-xs" htmlFor="username">
        Username
      </label>
      <input
        className="w-full bg-gray-100 p-2 rounded-sm border border-black text-black"
        type="text"
        name="username"
        // defaultValue="test_username"
        placeholder="Your name"
        value={username}
        onChange={usernameOnChange}
      />

      <label className="text-xs" htmlFor="useremail">
        Email
      </label>
      <input
        className="w-full bg-gray-100 p-2 rounded-sm border border-black text-black"
        type="text"
        name="useremail"
        // defaultValue="test_useremail@stellarcarbon.io"
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
