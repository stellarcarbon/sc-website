import SinkingStep from "@/containers/sink/steps/Step";
import { Blocks } from "react-loader-spinner";

export default function FetchChallenge() {
  return (
    <SinkingStep title="Fetching">
      <div className="text-center font-semibold text-lg">
        Requesting round down...
      </div>
      <div className="my-12 flex justify-center">
        <Blocks
          height="120"
          width="120"
          color="#ff0000"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    </SinkingStep>
  );
}
