import {
  SinkingFinalizationSteps,
  useSinkingContext,
} from "@/context/SinkingContext";
import { Hourglass } from "react-loader-spinner";
import { SinkStatusDetails } from "../SinkingFinalization";
import SinkingStep from "./Step";

export default function AwaitSinking() {
  const { step } = useSinkingContext();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg">
        {SinkStatusDetails[step].message}
      </span>
      <div className="my-4">
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
    </SinkingStep>
  );
}
