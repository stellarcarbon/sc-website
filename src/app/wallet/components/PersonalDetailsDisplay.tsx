import { useAppContext } from "@/app/context/appContext";

export default function PersonalDetailsDisplay() {
  const { walletConnection } = useAppContext();
  if (!walletConnection) {
    return <></>;
  }

  return (
    <div className="mb-8 font-bold">
      {!walletConnection.isAnonymous ? (
        <>
          <p>Username: {walletConnection.personalDetails?.username}</p>
          <p>Email: {walletConnection.personalDetails?.useremail}</p>
        </>
      ) : (
        <p>Anonymous connection</p>
      )}
    </div>
  );
}
