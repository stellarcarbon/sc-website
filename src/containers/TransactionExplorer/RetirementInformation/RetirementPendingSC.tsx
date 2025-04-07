import Link from "next/link";

export default function RetirementPendingSC() {
  return (
    <div className="p-2 px-3 md:px-4 w-full text-sm flex flex-col items-center">
      <div className="text-center my-2">
        {
          "This transaction is waiting for the Stellarcarbon team to finalize the retirement."
        }
      </div>

      <div className="text-center my-2">
        All transactions are eventually coupled to a retirement. Find out more
        about the retirement process{" "}
        <Link href="/explain" className="underline text-accentSecondary">
          here
        </Link>
        .
      </div>
    </div>
  );
}
