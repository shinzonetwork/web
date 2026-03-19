type PaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <>
      <button
        type="button"
        disabled={page === 1}
        onClick={onPrevious}
        className="px-4 py-2 rounded-md border border-border bg-background text-foreground hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={onNext}
        className="px-4 py-2 rounded-md border border-border bg-background text-foreground hover:bg-background/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </>
  );
}
