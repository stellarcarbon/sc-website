import { useMemo } from "react";

export default function TruncatedHash({
  hash,
  uppercase = false,
}: {
  hash?: string;
  uppercase?: boolean;
}) {
  const firstChars = useMemo(() => {
    return hash?.slice(0, 4);
  }, [hash]);
  const lastChars = useMemo(() => {
    return hash?.slice(-4);
  }, [hash]);

  return (
    <div className={uppercase ? "uppercase" : "lowercase"}>
      <span>{firstChars}</span>
      <span>...</span>
      <span>{lastChars}</span>
    </div>
  );
}
