import { useMemo } from "react";

export default function TruncatedHash({
  hash,
  uppercase = false,
  chars = 4,
}: {
  hash?: string;
  uppercase?: boolean;
  chars?: number;
}) {
  const firstChars = useMemo(() => {
    return hash?.slice(0, chars);
  }, [hash, chars]);
  const lastChars = useMemo(() => {
    return hash?.slice(-chars);
  }, [hash, chars]);

  return (
    <div className={uppercase ? "uppercase" : "lowercase"}>
      <span>{firstChars}</span>
      <span>...</span>
      <span>{lastChars}</span>
    </div>
  );
}
