import { NavLink } from "../nav-link";
import type { HeaderNavItem } from "./types";

export interface DesktopNavProps {
  items: HeaderNavItem[];
}

export const DesktopNav = ({ items }: DesktopNavProps) => {
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-6 lg:flex"
    >
      {items.map((item) => (
        <NavLink key={item.href} link={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
