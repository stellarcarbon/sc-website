import { HTMLProps } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps extends HTMLProps<HTMLDivElement> {}

export default function Modal({ children }: ModalProps) {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600 opacity-80 z-10"></div>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
        <div className="relative bg-primary w-[90%] md:w-[60%] lg:w-[60%] mt-[60px] h-[60%] lg:h-[70%] max-w-[800px] opacity-100 shadow-xl rounded-md overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
