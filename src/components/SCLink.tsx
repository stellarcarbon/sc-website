import Link from "next/link";

type SCLinkProps = React.ComponentProps<typeof Link>;

export default function SCLink({ children, href }: SCLinkProps) {
  return (
    <Link
      href={href}
      className="underline text-accentSecondary hover:text-tertiary"
    >
      {children}
    </Link>
  );
}
