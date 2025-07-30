import { Hourglass } from "react-loader-spinner";
import RoundingStep from "@/containers/rounding/steps/Step";

export default function AwaitSinking({ message }: { message: string }) {
  return (
    <RoundingStep title="Waiting for API">
      <span className="text-center">{message}</span>
      <div className="flex-1 flex items-center justify-center my-4">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#d8def2", "#d8def2"]}
        />
      </div>
    </RoundingStep>
  );
}
