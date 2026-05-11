import type { ValidationIssue } from "@shinzo/lenses/validate";

interface ValidationIssuesProps {
  issues: ValidationIssue[];
}

export const ValidationIssues = ({ issues }: ValidationIssuesProps) => {
  if (issues.length === 0) return null;

  const hasErrors = issues.some((issue) => issue.severity === "error");

  return (
    <div className="flex flex-col gap-2">
      {hasErrors && (
        <p className="text-sm font-medium text-red-600">
          Validation failed — deployment was stopped.
        </p>
      )}
      {issues.map((issue, idx) => (
        <div
          key={idx}
          className={`rounded-lg border p-3 text-sm ${
            issue.severity === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          <span className="font-mono text-xs opacity-60">{issue.code}</span>{" "}
          {issue.message}
        </div>
      ))}
    </div>
  );
};
