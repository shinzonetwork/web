export function Footer() {
  return (
    <footer className="w-full px-6 py-8 flex flex-col md:flex-row justify-between items-center mt-auto bg-background-muted border-t border-border font-mono text-xs uppercase tracking-widest">
      <div className=" text-muted-foreground mb-4 md:mb-0">
        Shinzo / Technical Registry{" "}
      </div>
      <div className="flex gap-8">
        <a
          className="text-muted-foreground hover:text-accent transition-colors"
          href="https://shinzo.network"
        >
          WEBSITE
        </a>
        <a
          className="text-muted-foreground hover:text-accent transition-colors"
          href="https://docs.shinzo.network"
        >
          DOCUMENTATION
        </a>
        <a
          className="text-muted-foreground hover:text-accent transition-colors"
          href="https://explorer.shinzo.network"
        >
          EXPLORER
        </a>
      </div>
    </footer>
  );
}
