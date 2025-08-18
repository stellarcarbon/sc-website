import Link from "next/link";

type SCLinkProps = React.ComponentProps<typeof Link>;

export default function SCLink({
  children,
  href,
  className,
  target,
}: SCLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      className={`underline text-alternateMedium hover:text-alternateLight ${className}`}
    >
      {children}
    </Link>
  );
}
