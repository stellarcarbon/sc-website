import { useAppContext } from "@/app/context";

export default function PersonalDetailsDisplay() {
  const { walletConnection } = useAppContext();
  if (!walletConnection) {
    return <></>;
  }

  return (
    <div>
      {!walletConnection.isAnonymous && (
        <>
          <p>Username: {walletConnection.personalDetails?.username}</p>
          <p>Email: {walletConnection.personalDetails?.useremail}</p>
        </>
      )}
    </div>
  );
}
