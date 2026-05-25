import { useRef } from "react";
import { Overview } from "./sections/Overview";
import { Logo } from "./sections/Logo";
import { Colors } from "./sections/Colors";
import { Typography } from "./sections/Typography";
import { Buttons } from "./sections/Buttons";
import { ComponentsSection } from "./sections/ComponentsSection";
import { Tokens } from "./sections/Tokens";
import { GroupIntro } from "./sections/GroupIntro";
import { FadeIn } from "./components/FadeIn";
import { SidebarAccordion } from "./components/SidebarAccordion";
import { Button } from "./components/Button";
import { DesignMdView } from "./components/DesignMdView";
import { GROUPS } from "./config/sections";
import { useBrandKitNav } from "./hooks/useBrandKitNav";
import designDoc from "../DESIGN.md?raw";

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  logo: Logo,
  colors: Colors,
  typography: Typography,
  buttons: Buttons,
  components: ComponentsSection,
  tokens: Tokens,
};

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const {
    showRaw, navVisible, activeSection,
    openGroupId, setOpenGroupId,
    openRaw, closeRaw, handleNavClick,
  } = useBrandKitNav();

  return (
    <div ref={appRef}>
      {/* ===== HEADER ===== */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-200 h-nav",
          "flex items-center justify-between px-5 pr-6",
          "bg-white/95 backdrop-blur-sm",
          "transition-[opacity,transform] duration-250 ease-[ease]",
          navVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-[-6px] pointer-events-none",
        ].join(" ")}
      >
        <a href="#overview" onClick={handleNavClick} className="flex items-center gap-4 no-underline">
          <img src="/logo/shinzo-logomark-black.png" className="w-6" alt="Shinzo" />
          <span className="text-xs font-mono text-szo-text font-normal tracking-wider leading-none">
            Brand Design System
          </span>
        </a>
        <Button size="sm" onClick={showRaw ? closeRaw : openRaw}>
          {showRaw ? "Visual Explorer" : "DESIGN.md"}
        </Button>
      </header>

      {/* ===== MAIN / RAW VIEW ===== */}
      {showRaw ? (
        <DesignMdView content={designDoc} />
      ) : (
        <main>
          <Overview />

          <div className="flex items-start pt-nav">
            {/* ===== SIDEBAR ===== */}
            <aside className="hidden lg:block sticky top-nav h-[calc(100svh-nav)] w-sidebar shrink-0 overflow-y-auto py-4 bg-white scrollbar-thin [scrollbar-color:var(--color-gray-300)_transparent]">
              {GROUPS.map((group, i) => (
                <div key={group.id}>
                  {i > 0 && <div className="h-px bg-gray-200 mx-4 my-2" />}
                  <SidebarAccordion
                    label={group.title}
                    href={`#${group.id}`}
                    open={openGroupId === group.id}
                    onToggle={() => setOpenGroupId(openGroupId === group.id ? "" : group.id)}
                    items={group.sections}
                    activeSection={activeSection}
                    onNavClick={handleNavClick}
                  />
                </div>
              ))}

              <div className="h-px bg-gray-200 mx-4 my-2" />

              <button
                onClick={openRaw}
                className="flex items-center justify-between w-full px-6 py-4 bg-transparent border-none cursor-pointer text-sm font-mono text-left text-gray-900 hover:text-szo-primary transition-colors duration-100"
              >
                DESIGN.md
              </button>
            </aside>

            {/* ===== SECTIONS ===== */}
            <div className="flex-1 min-w-0">
              {GROUPS.map((group) => {
                const introItems = group.sections.filter((s) => s.desc);
                return (
                  <div key={group.id}>
                    <GroupIntro
                      id={group.id}
                      group={group.group}
                      title={group.title}
                      description={group.description}
                      items={introItems as { id: string; label: string; desc: string }[]}
                    />
                    {group.sections
                      .filter((s) => SECTION_COMPONENTS[s.id])
                      .map((s) => {
                        const SectionComp = SECTION_COMPONENTS[s.id];
                        return <SectionComp key={s.id} />;
                      })}
                  </div>
                );
              })}

              <footer className="border-t border-gray-200 overflow-hidden max-w-content px-4">
                <FadeIn y={24} duration={0.9}>
                  <div className="px-5 pt-6 pb-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">Shinzō © 2025</span>
                  </div>
                  <img
                    src="/logo/shinzo-logo-black.svg"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    className="opacity-90"
                    alt="Shinzo"
                  />
                </FadeIn>
              </footer>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
