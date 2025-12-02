import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isTextarea?: boolean;
}

/**
 * Reusable form field component for configuration inputs
 */
export function ConfigurationFormField({
  id,
  label,
  value,
  onChange,
  isTextarea = false,
}: FormFieldProps) {
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
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px] font-mono text-sm"
        />
      ) : (
        <Input
          id={id}
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono"
        />
      )}
    </div>
  );
}
