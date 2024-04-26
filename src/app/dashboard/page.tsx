"use client";

import PersonalDetailsDisplay from "@/components/wallet/PersonalDetailsDisplay";
import { useAppContext } from "../../context/appContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Button from "@/components/Button";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

export default function Dashboard() {
  const { walletConnection } = useAppContext();
  const router = useRouter();

  // useEffect(() => {
  //   console.log("wc:", walletConnection);
  //   if (walletConnection) {
  //     router.push("/dashboard/overview");
  //   } else if (walletConnection === undefined) {
  //     router.push("/wallet/connect");
  //   }
  // }, [walletConnection]);

  return (
    <div className="mt-6 flex flex-col gap-4 w-full">
      {/* Welkom blok */}
      <div className="flex flex-col m-2">
        <span className="text-xl self-center">Welkom, anonymous</span>
        <span className="text-xs mt-1 text-center">
          Beheer hier je wallet connection en bekijk een samenvatting van je
          transacties.
        </span>
      </div>

      <div className="m-2 p-4 flex flex-col gap-2 rounded bg-primary border border-accentSecondary">
        {/* <h1 className="self-center text-[18px] mb-2">Sinking summary</h1> */}

        <div className="text-sm flex justify-between items-center gap-1">
          <div className="flex flex-col">
            <div className="text-2xl font-bold flex gap-4 justify-between items-center">
              <span className="">Sinked</span>
              <div className="flex gap-1 items-center">
                <span className="font-normal">25</span>
                <CARBONCurrencyIcon width={18} height={18} />
              </div>
            </div>

            <span className="text-xs">
              This is the total amount of CARBON tokens that have been sinked
              using this wallet.
            </span>
          </div>
        </div>

        <div className="text-sm flex justify-between items-center gap-1">
          <div className="flex flex-col">
            <div className="text-2xl font-bold flex gap-4 justify-between items-center">
              <span className="">Pending</span>
              <div className="flex gap-1 items-center">
                <span className="font-normal">1.55</span>
                <CARBONCurrencyIcon width={18} height={18} />
              </div>
            </div>

            <span className="text-xs">
              The amount of fractional carbon certificates that are still
              pending.
            </span>
          </div>
        </div>
      </div>

      {/* <hr className="mx-4 border-accentSecondary" /> */}
      {/* <div className="m-2 p-4 flex flex-col gap-2 bg-primary border border-accentSecondary rounded"></div> */}

      <div className="m-2 p-4 flex flex-col gap-2 bg-primary border border-accentSecondary rounded">
        <h1 className="self-center text-[18px] mb-2">Connection details</h1>

        <div className="flex flex-col">
          <span className="text-md font-bold">Wallet type</span>
          <span className="text-sm">Albedo</span>
        </div>

        <div className="flex flex-col">
          <span className="text-md font-bold">Stellar pub key</span>
          <span className="text-xs break-words">
            {walletConnection?.stellarPubKey}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-md font-bold">Contact information</span>
          {walletConnection?.isAnonymous ? (
            <span className="text-xs">Anonymous</span>
          ) : (
            <div className="flex flex-col text-xs">
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

        <div className="flex justify-center gap-4 h-8 mt-3">
          <Button className="!py-1">Edit</Button>
          <Button className="!py-1">Disconnect</Button>
        </div>
      </div>

      {/* CINFO OLD */}
      {/* <div className="relative flex flex-col m-2 p-4 bg-primary border border-accentSecondary rounded-md">
        <div className="flex flex-col justify-between items-start w-full">
          <h1 className="text-lg font-bold">Your wallet is connected.</h1>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <span className="w-32">Wallet</span>
            <span className="text-xs">{walletConnection?.walletType}</span>
          </div>
          <div className="flex items-top md:items-center">
            <span className="w-32">Stellar PubKey</span>
            <span className="text-xs break-words max-w-[50%] md:max-w-[90%]">
              {walletConnection?.stellarPubKey}
            </span>
          </div>
          <PersonalDetailsDisplay />
        </div>
        <div className="absolute top-0 right-0 flex gap-2 justify-start mt-4 mr-4">
          <Button
            className="!p-2"
            onClick={() => {
              router.push("/wallet/connect");
            }}
          >
            <div className="flex items-center justify-between gap-1 text-xs">
              <span className="hidden md:block">Edit</span>
              <EditIcon />
            </div>
          </Button>
          <Button onClick={() => {}} className="!p-2">
            <div className="flex items-center justify-between gap-1 text-xs">
              <span className="hidden md:block">Remove</span>
              <DeleteIcon />
            </div>
          </Button>
        </div>
      </div> */}
    </div>
  );
}
