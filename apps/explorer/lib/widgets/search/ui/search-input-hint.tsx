import {
  LoaderCircle,
  X,
} from "lucide-react";

export function SearchInputHint({
  hasInput,
  isSearching,
  onClear,
}: {
  hasInput: boolean;
  isSearching: boolean;
  onClear: () => void;
}) {
  if (isSearching) {
    return (
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded border border-ui-accent bg-ui-bg-accent-hover text-ui-accent"
      >
        <LoaderCircle className="size-3.5 animate-spin" />
      </span>
    );
  }

  if (hasInput) {
    return (
      <button
        type="button"
        tabIndex={-1}
        aria-label="Clear Shinzohub search"
        className="absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded border border-transparent text-[#000] transition-colors hover:border-ui-accent/40 hover:bg-ui-bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-accent/60"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClear}
      >
        <X aria-hidden className="size-4" />
      </button>
    );
  }

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded border border-ui-accent bg-ui-bg-accent-hover font-mono text-xs font-semibold text-ui-accent"
    >
      /
    </span>
  );
}
