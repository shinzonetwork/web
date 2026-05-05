import { UI_HOME_HEADER_CONTENT } from "@/shared/lib";

export function TitleHome() {
  return (
    <section className="technical-grid relative w-full min-w-0 max-w-full overflow-hidden border-b border-border px-4 pb-16 pt-24 sm:px-12">
      <div className="flex items-center gap-2 mb-4 font-mono-label text-accent uppercase tracking-widest">
        <span className="w-3 h-3 bg-accent"></span>
        <span>Active Network Infrastructure</span>
      </div>
      <h1 className="font-h1 text-h1 text-black mb-6">{UI_HOME_HEADER_CONTENT.home.title}</h1>
      <p className="font-body-lg text-body-lg text-secondary max-w-2xl">{UI_HOME_HEADER_CONTENT.home.description}</p>
    </section>
  );
}