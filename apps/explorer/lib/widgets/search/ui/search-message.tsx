export function SearchMessage({
  description,
  title,
}: {
  description?: string;
  title: string;
}) {
  return (
    <div
      className="flex min-h-20 flex-col justify-center px-3 py-4 font-mono"
      role="status"
    >
      <p className="text-sm font-medium text-ui-text">{title}</p>
      {description && (
        <p className="mt-1 text-xs leading-5 text-ui-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
