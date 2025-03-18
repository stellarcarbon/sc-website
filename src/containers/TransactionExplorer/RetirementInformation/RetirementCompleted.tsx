import { MyTransactionRecord } from "@/app/types";
import { RetirementDetail, RetirementService } from "@/client";
import RetirementDetailCard from "@/components/dashboard/transactions/RetirementDetailCard";
import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function RetirementCompleted({
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
      const promises: Promise<RetirementDetail>[] = [];
      transaction.retirements.forEach((ret) => {
        promises.push(
          RetirementService.getRetirementItem({
            certificateId: ret.certificate_id,
          })
        );
      });
      setRetirementDetails(await Promise.all(promises));
      setIsLoadingRetirements(false);
      // RetirementService.getRetirementItem({ certificateId: })
    };

    getRetirements();
  }, [transaction]);
  return (
    <div className="p-2 w-full flex flex-col items-center">
      <div className="text-sm text-center">
        The CARBON sunk in this transaction has been retired into one or more
        Verra Certificates. View them below.
      </div>
      {isLoadingRetirements ? (
        <div className="mx-2 mb-4 text-center flex flex-col justify-center items-center flex-1">
          <Blocks
            height="80"
            width="80"
            color="#ff0000"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
          <span>Fetching retirements...</span>
        </div>
      ) : (
        <div className="w-full mt-4">
          {retirementDetails.map((retirement, idx) => {
            return (
              <RetirementDetailCard
                key={`ret_detail_card_${idx}`}
                retirement={retirement}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
