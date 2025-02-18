import { useSCRouter } from "@/app/utils";
import Button from "@/components/Button";

export default function ConnectLanding() {
  const router = useSCRouter();

  return (
    <div className="py-8 px-4 md:p-12 md:my-16 bg-darker w-full md:w-[60%] max-w-[800px] flex-1 md:flex-none md:border border-tertiary rounded-md shadow-xl flex flex-col justify-center gap-8">
      <h1 className="text-center text-3xl font-bold">
        Contributing to Stellarcarbon
      </h1>
      <span>
        To sink CARBON with stellarcarbon.io you have to connect with a Stellar
        wallet.
      </span>
      <span>
        Additionally, you can optionally provide us with your contact details so
        we can create and send personalized certificates to you.
      </span>
      <span className="font-bold text-lg text-center">
        {`All connection data is only stored in your browser and not on our
        servers.`}
      </span>
      <Button
        onClick={() => router.push("/wallet/connect")}
        className="self-center w-[200px]"
      >
        Connect my wallet
      </Button>
    </div>
  );
}
