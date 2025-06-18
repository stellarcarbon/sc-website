import { PropsWithChildren } from "react";
import ExplainContainer from "./ExplainContainer";
import ExplainBreadcrumb from "./ExplainBreadcrumb";
import { useExplainContext } from "@/context/ExplainContext";
import ExplainNav from "./ExplainNav";

export default function ExplainMobile({ children }: PropsWithChildren) {
  const { mobileNavOpen } = useExplainContext();

  return (
    <>
      {mobileNavOpen ? (
        <ExplainNav />
      ) : (
        <>
          <ExplainBreadcrumb />
          <ExplainContainer>{children}</ExplainContainer>
        </>
      )}
    </>
  );
}
