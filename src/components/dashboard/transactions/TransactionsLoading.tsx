import { Blocks } from "react-loader-spinner";

export default function TransactionsLoading() {
  return (
    <div className="flex flex-col justify-center items-center mb-4">
      <Blocks
        height="80"
        width="80"
        color="#ff0000"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
      <span>Fetching transaction history...</span>
    </div>
  );
}
