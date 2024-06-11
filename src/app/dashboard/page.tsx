"use client";

import PersonalDetailsDisplay from "@/components/wallet/PersonalDetailsDisplay";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Button from "@/components/Button";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSwipeable, SwipeDirections } from "react-swipeable";
import Link from "next/link";
import { useSCRouter } from "../utils";

export default function Dashboard() {
  const { walletConnection, disconnectWallet } = useAppContext();
  const router = useSCRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/sink"),
    onSwipedRight: () => router.push("/dashboard/transactions/history"),
    delta: 100,
  });

  useEffect(() => {
    if (walletConnection === undefined) {
      router.push("/wallet");
    }
  }, [walletConnection, router]);

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col gap-8 w-full flex-1 justify-start py-8"
    >
      {/* Transaction summary */}
      <div className="mx-4 py-4 px-4 flex flex-col gap-8 bg-primary border border-tertiary md:mx-8 md:p-6">
        <div className="flex flex-col gap-1 text-sm">
          <div className="text-xl font-bold flex gap-4 justify-between items-center border-b border-tertiary">
            <span className="text-lg">Latest transaction</span>
            <div className="flex gap-1 items-center text-accent">
              <span className="font-normal">2</span>
              <CARBONCurrencyIcon width={18} height={18} />
            </div>
          </div>

          <span className="text-xs mt-2">
            Created on 01-01-2001 with memo: {`"ENVIRONMENT"`}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="text-xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
            <span className="text-lg">Total sinked</span>
            <div className="flex gap-1 items-center text-accent">
              <span className="font-normal">25</span>
              <CARBONCurrencyIcon width={18} height={18} />
            </div>
          </div>

          <span className="text-xs mt-2">
            This is the total amount of CARBON tokens that have been sinked
            using this wallet.
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="text-xl font-bold flex gap-4 justify-between items-center border-b border-b-tertiary">
            <span className="text-lg">Pending certificate claims</span>
            <div className="flex gap-1 items-center text-accent">
              <span className="font-normal">1.55</span>
              <CARBONCurrencyIcon width={18} height={18} />
            </div>
          </div>

          <span className="text-xs mt-2">
            The amount of fractional carbon certificates that are still pending
            a certificate claim.{" "}
            <Link className="underline text-accentSecondary" href="">
              What does this mean?
            </Link>
          </span>
        </div>
      </div>

      {/* Connection details */}
      <div className="mx-4 p-4 flex flex-col gap-1 bg-primary border border-tertiary text-accent md:mx-8 md:p-6">
        <h1 className="text-white font-bold text-lg text-start">
          Session details
        </h1>

        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white">Pubkey</span>
          <span className="text-[10px] break-words w-[60%] md:w-[80%] text-right">
            {walletConnection?.stellarPubKey}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-b-tertiary">
          <span className="text-white">Wallet</span>
          <span className="text-xs">{walletConnection?.walletType}</span>
        </div>
        {walletConnection?.isAnonymous ? (
          <></>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-b-tertiary">
              <span className="text-white">Username</span>
              <span className="text-xs">
                {walletConnection?.personalDetails?.username}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-b-tertiary">
              <span className="text-white">Email</span>
              <span className="text-xs">
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
    </div>
  );
}
