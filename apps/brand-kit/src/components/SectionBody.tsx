interface SectionBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBody({ children, className = "" }: SectionBodyProps) {
  return (
    <div className={["col-span-full lg:col-start-2 lg:col-span-10", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
