"use client";

import { useAppContext } from "@/context/appContext";

export default function PaymentList() {
  const { myTransactions } = useAppContext();

  return (
    <div className="m-2 mb-4 py-3 pb-2 flex flex-col gap-2 bg-primary rounded-md border border-accentSecondary">
      <h1 className="flex flex-col text-lg font-bold text-center">
        <span>Transaction history</span>
        <span className="text-xs break-words w-[80%] self-center">{`For account (dev-mode): GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y`}</span>
      </h1>
      {myTransactions !== null ? (
        myTransactions.length === 0 ? (
          <div className="flex flex-col items-center m-4 gap-2">
            <span className=" text-sm text-center">
              {`Looks like you don't have any transactions yet. After sinking
              carbon you can view your history here.`}
            </span>
          </div>
        ) : (
          myTransactions.map((transaction) => {
            return (
              <a
                href={`https://stellar.expert/explorer/public/tx/${transaction.id}`}
                target="_blank"
                // onClick={() => {
                //   router.push(`/wallet/transaction/${transaction.id}`);
                // }}
                className="flex flex-col text-sm bg-secondary rounded-md  border-accentSecondary p-2 mx-2 "
                key={`payment_${transaction.id}`}
              >
                <div className="flex justify-start items-center">
                  <span className="w-24 md:w-32">Hash</span>
                  <span className=" truncate max-w-[60%]">
                    {transaction.id}
                  </span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="w-24 md:w-32">Date</span>
                  <span className="">
                    {new Date(transaction.createdAt).toDateString()}
                  </span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="w-24 md:w-32">Sinked</span>

                  <span className="">{transaction.sinkAmount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-start items-center">
                  <span className="w-24 md:w-32">Price</span>

                  <div className="flex gap-1 ">
                    <span>{transaction.assetAmount?.toFixed(2)}</span>
                    <span>{transaction.asset}</span>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <span className="w-24 md:w-32">Memo</span>

                  <span className=" truncate max-w-[60%]">
                    {transaction.memo}
                  </span>
                </div>
              </a>
            );
          })
        )
      ) : (
        <div className="text-center py-4">Loading data from blockchain...</div>
      )}
    </div>
  );
}
