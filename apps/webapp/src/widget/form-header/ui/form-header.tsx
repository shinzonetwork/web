import { UI_TEXT_CONTENT } from "@/shared/lib";

export function FormHeader({
  content,
}: {
  content: (typeof UI_TEXT_CONTENT)[keyof typeof UI_TEXT_CONTENT];
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-mono text-2xl font-medium">{content.title}</h3>
      <p className="font-mono text-base leading-relaxed text-muted-foreground">
        {content.description}
      </p>
    </div>
  );
}
