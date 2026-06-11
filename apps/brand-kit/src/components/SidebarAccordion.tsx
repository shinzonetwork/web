interface SidebarAccordionProps {
  label: string;
  href: string;
  open: boolean;
  onToggle: () => void;
  items: { id: string; label: string }[];
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function SidebarAccordion({
  label, href, open, onToggle, items, activeSection, onNavClick,
}: SidebarAccordionProps) {
  return (
    <div className="mb-1">
      {/* Header */}
      <div className="flex items-center justify-between w-full py-[6px] pr-3 pl-6">
        <a
          href={href}
          onClick={onNavClick}
          className="flex-1 py-[10px] text-sm font-normal text-gray-900 no-underline transition-colors duration-100 hover:text-szo-primary"
        >
          {label}
        </a>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-7 h-7 shrink-0 bg-transparent border-none cursor-pointer text-gray-400 rounded-[4px] transition-colors duration-100 hover:bg-gray-100"
          aria-expanded={open}
        >
          <svg
            className={`w-[14px] h-[14px] shrink-0 transition-transform duration-200 text-gray-400 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 6 8 10 12 6" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div
        className={`overflow-hidden transition-[max-height] duration-[250ms] ease-in-out ${open ? "max-h-[600px]" : "max-h-0"}`}
      >
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={onNavClick}
            className={[
              "block py-[10px] pl-6 pr-4 rounded-md mx-2 text-px-13 font-normal no-underline transition-all duration-100",
              activeSection === id
                ? "bg-[color-mix(in_srgb,var(--color-szo-primary)_8%,transparent)] text-szo-primary font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            ].join(" ")}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
