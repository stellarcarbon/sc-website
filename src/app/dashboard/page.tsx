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

export default function Dashboard() {
  const { walletConnection, disconnectWallet } = useAppContext();
  const router = useRouter();

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
      className="flex flex-col w-full flex-1 justify-start"
    >
      {/* Welkom */}
      <div className="flex flex-col my-6 w-full">
        {/* <span className="text-xl self-center">Sink CARBON</span> */}
        <span className="text-sm mt-1 text-center">
          Get an overview of your activity and manage your wallet connection.
        </span>
      </div>
      {/* <div className="py-6 px-4 flex flex-col">
        <span className="text-xl self-center">
          Welkom,{" "}
          {walletConnection?.isAnonymous
            ? "anonymous"
            : walletConnection?.personalDetails?.username}
        </span>
        <span className="text-sm mt-1 text-center">
          Beheer hier je wallet connection en bekijk een samenvatting van je
          transacties.
        </span>
      </div> */}

      {/* <hr className="border-tertiary" /> */}

      {/* Transaction summary */}
      <div className="py-4 px-4 flex flex-col gap-3 bg-primary border-y border-y-tertiary">
        <h1 className="text-2xl self-center">Overview</h1>
        {/* 
        <div className="flex flex-col">
          <span className="text-md">
            Welkom{" "}
            {walletConnection?.isAnonymous
              ? "anonymous"
              : walletConnection?.personalDetails?.username}
            ,
          </span>
          <span className="text-xs">blabla</span>
        </div> */}

        <div className="flex flex-col gap-1 text-sm">
          <div className="text-xl font-bold flex gap-4 justify-between items-center">
            <span className="">Total sinked</span>
            <div className="flex gap-1 items-center text-accent">
              <span className="font-normal">25</span>
              <CARBONCurrencyIcon width={18} height={18} />
            </div>
          </div>

          <span className="text-xs">
            This is the total amount of CARBON tokens that have been sinked
            using this wallet.
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="text-xl font-bold flex gap-4 justify-between items-center">
            <span className="">Pending certificate claims</span>
            <div className="flex gap-1 items-center text-accent">
              <span className="font-normal">1.55</span>
              <CARBONCurrencyIcon width={18} height={18} />
            </div>
          </div>

          <span className="text-xs">
            The amount of fractional carbon certificates that are still pending
            a certificate claim.{" "}
            <Link className="underline text-accentSecondary" href="">
              What does this mean?
            </Link>
          </span>
        </div>
      </div>

      {/* <hr className="border-tertiary" /> */}

      {/* Contact details */}
      <div className="my-8 p-4 flex flex-col gap-3 bg-primary border-y border-y-tertiary">
        <h1 className="self-center text-2xl">Connection details</h1>

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Wallet type</span>
          <span className="text-sm text-accent">
            {walletConnection?.walletType}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Stellar public key</span>
          <span className="text-xs break-words text-accent">
            {walletConnection?.stellarPubKey}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Contact information</span>
          {walletConnection?.isAnonymous ? (
            <span className="text-xs text-accent">Anonymous</span>
          ) : (
            <div className="flex flex-col text-xs text-accent">
              <div className="flex justify-between">
                <span className="font-bold">Username:</span>
                <span>{walletConnection?.personalDetails?.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Email address:</span>
                <span>{walletConnection?.personalDetails?.useremail}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 h-8 mt-1">
          <Button
            className="!py-1"
            onClick={() => router.push("/wallet/connect")}
          >
            Edit
          </Button>
          <Button className="!py-1" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
