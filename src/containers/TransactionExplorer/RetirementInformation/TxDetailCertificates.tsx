import { MyTransactionRecord } from "@/app/types";
import RetirementDetailCard from "@/containers/TransactionExplorer/RetirementInformation/RetirementDetailCard";
import { getRetirementItem, RetirementDetail } from "@stellarcarbon/sc-sdk";
import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function TxDetailCertificates({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const [isLoadingRetirements, setIsLoadingRetirements] =
    useState<boolean>(true);
  const [retirementDetails, setRetirementDetails] = useState<
    RetirementDetail[]
  >([]);

  useEffect(() => {
    const getRetirements = async () => {
      const promises: Promise<{
        data: RetirementDetail | undefined;
        error: undefined | unknown;
      }>[] = [];
      transaction.retirements.forEach((ret) => {
        promises.push(
          getRetirementItem({
            path: {
              certificate_id: ret.certificate_id,
            },
          })
        );
      });

      const res = await Promise.all(promises);
      setRetirementDetails(
        res
          .map((r) => r.data)
          .filter((data): data is RetirementDetail => data !== undefined)
      );
      setIsLoadingRetirements(false);
      // RetirementService.getRetirementItem({ certificateId: })
    };

    getRetirements();
  }, [transaction]);

  if (isLoadingRetirements) {
    return (
      <div className="w-full flex justify-center">
        <Blocks />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {retirementDetails.map((retirement, idx) => {
        const amountFilled = transaction.retirements.find(
          (ret) => ret.certificate_id === retirement.certificate_id
        )?.amount_filled;

        return (
          <RetirementDetailCard
            key={`ret_detail_card_${idx}`}
            retirement={retirement}
            amountFilled={Number(amountFilled)}
          />
        );
      })}
    </div>
  );
}
