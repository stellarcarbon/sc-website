import { Hourglass } from "react-loader-spinner";
import SinkingStep from "./Step";

import SinkingStepButtons from "./Buttons";

export default function AwaitSinking({ message }: { message: string }) {
  return (
    <SinkingStep title="Waiting for API">
      <span className="text-center text-lg mt-6">{message}</span>
      <div className="flex-1 flex items-center justify-center my-20">
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

      <SinkingStepButtons></SinkingStepButtons>
    </SinkingStep>
  );
}
