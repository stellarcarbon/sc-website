import { useExplainContext } from "@/context/ExplainContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ExplainBreadcrumb() {
  const { mobileNavOpen, setMobileNavOpen, selectedTier3, selectedTier2 } =
    useExplainContext();

  return (
    <div className=" bg-primary p-4 flex justify-between items-center text-lg">
      <div className="">
        {selectedTier3
          ? selectedTier3.label
          : selectedTier2
          ? selectedTier2.label
          : ""}
      </div>
      <button
        className="bg-secondary rounded px-3 py-1"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
}
