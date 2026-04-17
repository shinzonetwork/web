import type { ViewValidationResult } from "@shinzo/lenses/validate";

export class ViewValidationError extends Error {
  result: ViewValidationResult;

  constructor(result: ViewValidationResult) {
    const errorCount = result.issues.filter(
      (issue) => issue.severity === "error"
    ).length;
    super(`View validation failed with ${errorCount} error(s)`);
    this.name = "ViewValidationError";
    this.result = result;
  }
}
