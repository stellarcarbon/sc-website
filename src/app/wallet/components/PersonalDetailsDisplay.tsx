import { useAppContext } from "@/app/context/appContext";

export default function PersonalDetailsDisplay() {
  const { walletConnection } = useAppContext();
  if (!walletConnection) {
    return <></>;
  }

  return (
    <div className="">
      {!walletConnection.isAnonymous ? (
        <div className="">
          <div className="flex justify-between">
            <span>Username</span>
            <span>{walletConnection.personalDetails?.username}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{walletConnection.personalDetails?.useremail}</span>
          </div>
        </div>
      ) : (
        <p>Anonymous connection</p>
      )}
    </div>
  );
}
