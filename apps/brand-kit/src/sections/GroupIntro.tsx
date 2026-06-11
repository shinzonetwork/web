import { BayerGradient } from "../components/BayerGradient";
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
        <div className="flex flex-wrap flex-col lg:flex-row justify-stretch lg:max-w-2/3 divide-gray-200 divide-x-2 border-gray-200 border-2 relative">
          {items.map(({ id, label, desc }) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative block lg:w-1/3 w-full group hover:z-10"
            >
              <div className="relative h-full z-2 bg-white px-4 py-3 group-hover:hover:outline-2 group-hover:hover:outline-szo-primary group-hover:hover:-outline-offset-2 transition-all" >
                <div className="text-px-14 font-display mb-1">/ {label}</div>
                <div className="text-sm text-gray-600">{desc}</div>
              </div>
              <BayerGradient from="#ffffff" to="#d01f27" className="absolute right-0 bottom-0 group-hover:-right-2 group-hover:-bottom-2 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none" />
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
