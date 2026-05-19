"use client";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { ChangeEvent, ReactNode } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isTextarea?: boolean;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  isSelect?: boolean;
  selectOptions?: { value: string; label: string }[];
  /** Shown in a tooltip when hovering the logo next to the label (also exposed to SR via aria-describedby). */
  description?: ReactNode;
};

/**
 * Reusable form field component for configuration inputs
 */
export function InputField({
  id,
  label,
  value,
  onChange,
  isTextarea = false,
  isSelect = false,
  selectOptions = [],
  error,
  disabled = false,
  required = true,
  description,
}: InputFieldProps) {
  const describedBy = [
    description ? `${id}-description` : undefined,
    error ? `${id}-error` : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-xs text-red-500">*</span>}
        </Label>
        {description ? (
          <>
            <span id={`${id}-description`} className="sr-only">
              {description}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex shrink-0 rounded-sm text-muted-foreground outline-none transition-opacity hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`More information: ${label}`}
                >
                  <InfoIcon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={6}
                className="max-w-xs font-normal"
              >
                {description}
              </TooltipContent>
            </Tooltip>
          </>
        ) : null}
      </div>
      {isTextarea ? (
        <Textarea
          id={id}
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
          disabled={disabled}
          className={`min-h-[100px] font-mono text-sm ${
            error ? "border-destructive focus-visible:ring-destructive" : ""
          } ${disabled ? "bg-muted cursor-not-allowed opacity-70" : ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy || undefined}
        />
      ) : isSelect ? (
        <select
          id={id}
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange(e.target.value)
          }
          className={`w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 ${
            error ? "border-destructive focus-visible:ring-destructive" : ""
          } ${disabled ? "bg-muted cursor-not-allowed opacity-70" : ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy || undefined}
          disabled={disabled}
        >
          {selectOptions.map((option: { value: string; label: string }) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            id={id}
            type="text"
            value={value ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            disabled={disabled}
            className={`font-mono ${
              error ? "border-destructive focus-visible:ring-destructive" : ""
            } ${disabled ? "bg-muted cursor-not-allowed opacity-70" : ""}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={describedBy || undefined}
          />
        </div>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-destructive mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
