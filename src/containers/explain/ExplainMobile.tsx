import { PropsWithChildren } from "react";
import ExplainContainer from "./ExplainContainer";
import ExplainBreadcrumb from "./ExplainBreadcrumb";
import { useExplainContext } from "@/context/ExplainContext";
import ExplainNav from "./ExplainNav";
import { useAppContext } from "@/context/appContext";

export default function ExplainMobile({ children }: PropsWithChildren) {
  const { isMobileDevice } = useAppContext();
  const { mobileNavOpen } = useExplainContext();

  if (!isMobileDevice) return null;

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
