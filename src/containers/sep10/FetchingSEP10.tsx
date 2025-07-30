import { Blocks } from "react-loader-spinner";
import RoundingStep from "../rounding/steps/Step";

export default function FetchingSEP10() {
  return (
    <RoundingStep title="Fetching">
      <div className="text-center text-lg">Requesting SEP10 challenge...</div>
      <div className="my-4 flex justify-center">
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
    </RoundingStep>
  );
}
