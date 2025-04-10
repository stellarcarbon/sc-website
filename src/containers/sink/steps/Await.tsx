import { useSinkingContext } from "@/context/SinkingContext";
import { Hourglass } from "react-loader-spinner";
import SinkingStep from "./Step";
import ModalHeader from "@/components/ModalHeader";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";

export default function AwaitSinking({ message }: { message: string }) {
  return (
    <SinkingStep title="Waiting for API">
      <span className="text-center text-lg font-semibold md:text-xl mt-4">
        {message}
      </span>
      <div className="flex-1 flex items-center justify-center my-16">
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
      <SinkingStepButtons>
        {/* <Button className="h-10">Cancel</Button> */}
      </SinkingStepButtons>
    </SinkingStep>
  );
}
