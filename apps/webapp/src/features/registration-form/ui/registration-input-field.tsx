import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { ChangeEvent } from "react";

interface RegistrationInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isTextarea?: boolean;
  error?: string;
  disabled?: boolean;
}

/**
 * Reusable form field component for configuration inputs
 */
export function RegistrationInputField({
  id,
  label,
  value,
  onChange,
  isTextarea = false,
  error,
  disabled = false,
}: RegistrationInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        <span className="text-xs text-red-500">*</span>
      </Label>
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
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
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
          aria-describedby={error ? `${id}-error` : undefined}
        />
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
