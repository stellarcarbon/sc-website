import { HTMLProps } from "react";
import BuyStellarCarbonIcon from "./icons/BuyStellarCarbon";
import { useRouter } from "next/navigation";
import { useSCRouter } from "@/app/utils";

interface CTAButtonProps extends HTMLProps<HTMLButtonElement> {}

export default function CTAButton({ className = "", onClick }: CTAButtonProps) {
  const router = useSCRouter();
  return (
    <button
      type="button"
      onClick={
        onClick
          ? onClick
          : () => {
              router.push("/dashboard");
            }
      }
      className={`p-1 w-[250px] flex justify-center bg-accent text-black uppercase rounded-2xl shadow-[0px_11px_40px_1px_rgba(255,255,255,0.3)] hover:bg-primary hover:text-white ${className}`}
    >
      <BuyStellarCarbonIcon />
    </button>
  );
}
