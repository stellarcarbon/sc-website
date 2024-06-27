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
        {children}
      </div>
    </>
  );
}
