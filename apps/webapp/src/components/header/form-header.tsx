export default function FormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
