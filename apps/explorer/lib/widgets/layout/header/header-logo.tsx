import Link from "next/link";
import ShinzoLogo from "../shinzo-logo.svg";

export interface HeaderLogoProps {
  href: string;
  onClick?: () => void;
}

export const HeaderLogo = ({ href, onClick }: HeaderLogoProps) => {
  return (
    <Link href={href} className="shrink-0" onClick={onClick}>
      <ShinzoLogo className="h-6 w-auto sm:h-7" />
    </Link>
  );
};
