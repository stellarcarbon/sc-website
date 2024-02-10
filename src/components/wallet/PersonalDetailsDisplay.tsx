import { useAppContext } from "@/context/appContext";

export default function PersonalDetailsDisplay() {
  const { walletConnection } = useAppContext();
  if (!walletConnection) {
    return <></>;
  }

  return (
    <div className="">
      {!walletConnection.isAnonymous && (
        <div className="">
          <div className="flex items-center">
            <span className="w-32">Username</span>
            <span className="text-xs">
              {walletConnection.personalDetails?.username}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-32">Email</span>
            <span className="text-xs">
              {walletConnection.personalDetails?.useremail}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
