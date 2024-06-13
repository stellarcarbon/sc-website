import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useViewportWidth } from "../utils";
import { useMemo } from "react";
import TransactionsLoading from "./transactions/history/TransactionsLoading";

export default function Overview() {
  const { walletConnection, disconnectWallet, myTransactions } =
    useAppContext();
  const router = useRouter();
  const isWide = useViewportWidth();

  const iconSize = useMemo(() => {
    return isWide ? 22 : 18;
  }, [isWide]);

  return (
    <>
      {/* Transaction summary */}

      <div className="mx-4 py-4 px-4 flex flex-col gap-8 bg-primary border border-tertiary md:mx-8 md:p-6">
        {myTransactions === null ? (
          <div className="flex-1 flex flex-col justify-center min-h-[250px] md:min-h-[400px]">
            <TransactionsLoading />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1 text-sm">
              <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-tertiary">
                <span className="text-lg md:text-2xl">Latest transaction</span>
                <div className="flex gap-1 items-center text-accent">
                  <span className="font-normal">2</span>
                  <CARBONCurrencyIcon width={iconSize} height={iconSize} />
                </div>
              </div>

              <span className="text-xs md:text-sm mt-2">
                Created on 01-01-2001 with memo: {`"ENVIRONMENT"`}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
                <span className="text-lg md:text-2xl">Total sinked</span>
                <div className="flex gap-1 items-center text-accent">
                  <span className="font-normal">25</span>
                  <CARBONCurrencyIcon width={iconSize} height={iconSize} />
                </div>
              </div>

              <span className="text-xs md:text-sm mt-2">
                This is the total amount of CARBON tokens that have been sinked
                using this wallet.
              </span>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <div className="text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
                <span className="text-lg md:text-2xl">
                  Pending certificate claims
                </span>
                <div className="flex gap-1 items-center text-accent">
                  <span className="font-normal">1.55</span>
                  <CARBONCurrencyIcon width={iconSize} height={iconSize} />
                </div>
              </div>

              <span className="text-xs md:text-sm mt-2">
                The amount of fractional carbon certificates that are still
                pending a certificate claim.{" "}
                <Link className="underline text-accentSecondary" href="">
                  What does this mean?
                </Link>
              </span>
            </div>
          </>
        )}
      </div>

      {/* Connection details */}
      <div className="mx-4 p-4 flex flex-col gap-1 bg-primary border border-tertiary text-accent md:mx-8 md:p-6">
        <h1 className="text-white font-bold text-lg md:text-2xl text-start">
          Session details
        </h1>

        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white md:text-lg">Pubkey</span>
          <span className="text-[10px] md:text-sm break-words w-[60%] md:w-[80%] text-right">
            {walletConnection?.stellarPubKey}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white md:text-lg">Wallet</span>
          <span className="text-xs md:text-sm">
            {walletConnection?.walletType}
          </span>
        </div>
        {walletConnection?.isAnonymous ? (
          <></>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-b-tertiary">
              <span className="text-white md:text-lg">Username</span>
              <span className="text-xs md:text-sm">
                {walletConnection?.personalDetails?.username}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-b-tertiary">
              <span className="text-white md:text-lg">Email</span>
              <span className="text-xs md:text-sm">
                {walletConnection?.personalDetails?.useremail}
              </span>
            </div>
          </>
        )}
        {/* <span className="text-sm">Connected anonymously.</span> */}
        <div className="flex justify-end gap-4 h-7 mt-4 mb-1 mx-2">
          <Button
            className="!text-sm"
            onClick={() => router.push("/wallet/connect")}
          >
            Edit
          </Button>
          <Button className="!text-sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      </div>
    </>
  );
}
