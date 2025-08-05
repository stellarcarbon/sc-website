import { useAppContext } from "@/context/appContext";

export default function OverviewContactInformation() {
  const { walletConnection } = useAppContext();

  return !walletConnection?.recipient ? (
    <span className="text-sm text-center mx-4 md:mx-8 my-4">
      Your session is anonymous. To receive personal certificates add your
      username and email address.
    </span>
  ) : (
    <div className="flex flex-col gap-1 mx-4 md:mx-8 my-4 w-full">
      <div className="flex flex-col gap-3 text-base">
        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white md:text-lg font-semibold">Name</span>
          <span className="text-xs md:text-base">
            {walletConnection.recipient.name}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white md:text-lg font-semibold">E-mail</span>
          <span className="text-xs md:text-base">
            {walletConnection.recipient.email}
          </span>
        </div>
      </div>
    </div>
  );
}
