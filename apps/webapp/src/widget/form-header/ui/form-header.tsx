import { UI_TEXT_CONTENT } from "@/shared/lib";

export function FormHeader() {
  return (
    <div className="space-y-2">
      <h3 className="font-mono text-2xl font-medium">
        {UI_TEXT_CONTENT.registration.title}
      </h3>
      <p className="font-mono text-base leading-relaxed text-muted-foreground">
        {UI_TEXT_CONTENT.registration.description}
      </p>
    </div>
  );
}
