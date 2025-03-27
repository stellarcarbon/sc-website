import { useSinkingContext } from "@/context/SinkingContext";
import { Hourglass } from "react-loader-spinner";
import SinkingStep from "./Step";

export default function AwaitSinking({ message }: { message: string }) {
  const { step } = useSinkingContext();

  return (
    <SinkingStep>
      <span className="text-center md:text-xl mt-4">{message}</span>
      <div className="flex-1 flex items-center">
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
