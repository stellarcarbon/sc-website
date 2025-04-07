import { HTMLProps } from "react";
import ParallaxDivider, { ParallaxBackgrounds } from "./ParallaxDivider";

interface ModalProps extends HTMLProps<HTMLDivElement> {}

export default function Modal({ children }: ModalProps) {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-[100dvh] bg-gray-600 opacity-80 z-[150]"></div>
      <div className="bg-dalle bg-no-repeat bg-cover fixed top-0 left-0 w-screen h-[100dvh] flex items-center justify-center z-[200]">
        <div className="relative bg-primary mx-2 md:w-[60%] lg:w-[60%] max-w-[600px] opacity-100 shadow-xl rounded-md border border-tertiary overflow-auto z-[2000]">
          <div className="flex flex-col justify-start px-4">
            {/* <ParallaxDivider image={ParallaxBackgrounds.RAINFOREST} mini /> */}
            {children}
            {/* <ParallaxDivider image={ParallaxBackgrounds.RAINFOREST} mini /> */}
          </div>
        </div>
      </div>
    </>
  );
}
