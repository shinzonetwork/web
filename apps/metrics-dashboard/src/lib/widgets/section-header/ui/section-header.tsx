export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center uppercase font-mono mb-6 text-xs tracking-wider">
      <span className="text-primary mr-3">/</span>
      <span className="text-foreground">{title}</span>
      <div className="grow h-px bg-border ml-2" />
    </div>
  );
}
