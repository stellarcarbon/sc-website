import { Hourglass } from "react-loader-spinner";
import ModalStep from "@/components/ModalStep";

export default function AwaitSinking({ message }: { message: string }) {
  return (
    <ModalStep title="Waiting for API">
      <span className="text-center">{message}</span>
      <div className="flex-1 flex items-center justify-center my-12">
        <Hourglass
          visible={true}
          height="92"
          width="92"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#d8def2", "#d8def2"]}
        />
      </div>
    </ModalStep>
  );
}
