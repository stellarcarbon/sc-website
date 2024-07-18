import { Blocks } from "react-loader-spinner";

export default function TransactionsLoading() {
  return (
    <div className="mx-2 text-center flex flex-col justify-center items-center">
      <Blocks
        height="80"
        width="80"
        // color="#ff0000"
        color="#0000ff"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
      <span>Fetching your transaction history...</span>
    </div>
  );
}
