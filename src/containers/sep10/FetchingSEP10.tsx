import { Blocks } from "react-loader-spinner";
import ModalStep from "../../components/ModalStep";

export default function FetchingSEP10() {
  return (
    <ModalStep title="Fetching">
      <div className="text-center">Requesting SEP10 challenge...</div>
      <div className="my-4 flex justify-center">
        <Blocks
          height="80"
          width="80"
          color="#ff0000"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    </ModalStep>
  );
}
