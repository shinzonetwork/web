interface TokenTableProps {
  children: React.ReactNode;
  className?: string;
}

export function TokenTable({ children, className = "" }: TokenTableProps) {
  return (
    <table
      className={[
        "w-full border-collapse text-px-13",
        "[&_thead_th]:text-left [&_thead_th]:px-3 [&_thead_th]:py-2",
        "[&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-[0.07em]",
        "[&_thead_th]:text-gray-500 [&_thead_th]:border-b [&_thead_th]:border-gray-200",
        "[&_tbody_td]:px-3 [&_tbody_td]:py-[10px] [&_tbody_td]:border-b [&_tbody_td]:border-gray-100 [&_tbody_td]:align-middle",
        "[&_tbody>tr:last-child>td]:border-b-0",
        className,
      ].join(" ")}
    >
      {children}
    </table>
  );
}

export function TokenName({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-szo-primary text-px-13">{children}</span>;
}

export function TokenValue({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-gray-600 text-px-13">{children}</span>;
}
