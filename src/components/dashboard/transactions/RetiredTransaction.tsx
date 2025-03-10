import { MyTransactionRecord, RetirementStatus } from "@/app/types";
import { Blocks } from "react-loader-spinner";
import RetirementDetailCard from "./RetirementDetailCard";
import { useEffect, useState } from "react";
import { RetirementDetail, RetirementService } from "@/client";

export default function RetiredTransaction({
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
    <div className="flex flex-col mt-6 gap-2 flex-1">
      <h1 className="text-center text-xl font-semibold">
        {RetirementStatus.RETIRED}
      </h1>
      <span className="text-md">
        The CARBON sunk in this transaction has been retired into one or more
        Verra Certificates.
      </span>
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
        <div className="flex flex-col my-4">
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
