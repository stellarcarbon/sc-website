import { useMemo } from "react";

export default function TruncatedHash({ pubKey }: { pubKey?: string }) {
  const firstChars = useMemo(() => {
    return pubKey?.slice(0, 4);
  }, [pubKey]);
  const lastChars = useMemo(() => {
    return pubKey?.slice(-4);
  }, [pubKey]);

  return (
    <div className="lowercase">
      <span>{firstChars}</span>
      <span>...</span>
      <span>{lastChars}</span>
    </div>
  );
}
