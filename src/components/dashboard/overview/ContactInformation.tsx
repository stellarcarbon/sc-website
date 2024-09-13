import { useAppContext } from "@/context/appContext";

export default function OverviewContactInformation() {
  const { walletConnection } = useAppContext();

  return walletConnection?.isAnonymous ? (
    <span className="text-sm text-center">
      Your session is anonymous. To receive personal certificates add your
      username and email address.
    </span>
  ) : (
    <div className="flex flex-col gap-1 mx-4 md:mx-8">
      <div className="flex flex-col gap-3 text-base mb-5">
        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white md:text-lg font-semibold">Username</span>
          <span className="text-xs md:text-base">
            {walletConnection?.personalDetails?.username}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white md:text-lg font-semibold">Email</span>
          <span className="text-xs md:text-base">
            {walletConnection?.personalDetails?.useremail}
          </span>
        </div>
      </div>
    </div>
  );
}
