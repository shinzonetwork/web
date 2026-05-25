import { FadeIn } from "../components/FadeIn";

interface GroupIntroProps {
  id: string;
  group: string;
  title: string;
  description: string;
  items: { id: string; label: string; desc: string }[];
}

export function GroupIntro({ id, group, title, description, items }: GroupIntroProps) {
  return (
    <div
      id={id}
      className="grid grid-cols-12 px-5 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20 border-b border-gray-200 max-w-content scroll-mt-nav"
    >
      <FadeIn className="col-span-full lg:col-start-2 lg:col-span-10">
        <div className="flex items-center uppercase font-mono mb-4 text-px-12 lg:text-px-16 text-szo-black">
          <span className="text-szo-primary mr-3">/</span>
          {group}
          <div className="grow h-px bg-szo-border ml-2" />
        </div>
        <h2 className="font-display text-4xl font-normal text-gray-900 mb-5 tracking-tight">{title}</h2>
        <p className="text-px-14 text-gray-600 leading-relaxed mb-10 max-w-xl">{description}</p>
        <div className="flex gap-3 flex-wrap">
          {items.map(({ id, label, desc }) => (
            <a
              key={id}
              href={`#${id}`}
              className="block px-4 py-3 border border-gray-200 rounded-lg no-underline transition-all duration-150 min-w-[140px] hover:border-szo-primary/40 hover:bg-[color-mix(in_srgb,var(--color-szo-primary)_4%,white)] hover:text-szo-primary"
            >
              <div className="text-px-13 font-medium mb-0.5">{label}</div>
              <div className="text-xs text-gray-600">{desc}</div>
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
