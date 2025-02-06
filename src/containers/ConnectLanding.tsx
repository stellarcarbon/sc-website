import { useSCRouter } from "@/app/utils";
import Button from "@/components/Button";

export default function ConnectLanding() {
  const router = useSCRouter();

  return (
    <div className="py-8 px-4 md:p-12 my-16 bg-primary w-[87%] md:w-[60%] max-w-[800px] min-h-[400px] border border-tertiary rounded-md shadow-xl flex flex-col justify-center gap-8">
      <h1 className="self-center text-2xl md:text-3xl">Connect a wallet</h1>
      <span>
        To sink CARBON with stellarcarbon.io you are required to connect with a
        wallet that is supported.
      </span>
      <span>
        Additionally, you can optionally provide us with your contact details so
        we can create and send personalized certificates to you.
      </span>
      <span>
        All connection data is only stored in your browser and not on our
        servers.
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
