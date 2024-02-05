import { HTMLProps } from "react";

interface HomeProps extends HTMLProps<HTMLHeadingElement> {}

export default function Header(props: HomeProps) {
  return (
    <>
      <h2 className="text-2xl font-noto">{props.children}</h2>
      <hr className="my-8 w-[100px] border-2 border-accentSecondary" />
    </>
  );
}
