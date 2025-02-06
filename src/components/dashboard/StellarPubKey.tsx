import { useMemo } from "react";

export default function StellarPubKey({ pubKey }: { pubKey?: string }) {
  const firstChars = useMemo(() => {
    return pubKey?.slice(0, 4);
  }, [pubKey]);
  const lastChars = useMemo(() => {
    return pubKey?.slice(-4);
  }, [pubKey]);

  return (
    <div>
      <span>{firstChars}</span>
      <span>...</span>
      <span>{lastChars}</span>
    </div>
  );
}
