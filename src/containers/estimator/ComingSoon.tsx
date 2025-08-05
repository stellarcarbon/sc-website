"use client";

import Button from "@/components/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function ComingSoon() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="my-6 p-4 w-full text-center">Coming soon</div>
      <Button onClick={() => router.push("/dashboard/sink")}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <div>Return to sink form</div>
      </Button>
    </div>
  );
}
