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
}: RegistrationInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {isTextarea ? (
        <Textarea
          id={id}
          placeholder={`Enter ${label.toLowerCase()}...`}
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
          className="min-h-[100px] font-mono text-sm"
        />
      ) : (
        <Input
          id={id}
          type="text"
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className="font-mono"
        />
      )}
    </div>
  );
}
