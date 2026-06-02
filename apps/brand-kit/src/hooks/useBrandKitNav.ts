import { useEffect, useState } from "react";
import { ALL_SECTION_IDS, GROUPS, SECTION_TO_GROUP } from "../config/sections";

export function useBrandKitNav() {
  const [showRaw, setShowRaw]         = useState(() => location.hash === "#design-md");
  const [navVisible, setNavVisible]   = useState(() => location.hash === "#design-md");
  const [activeSection, setActiveSection] = useState(ALL_SECTION_IDS[0]);
  const [openGroupId, setOpenGroupId] = useState<string>(GROUPS[0].id);

  function openRaw() {
    setShowRaw(true);
    setNavVisible(true);
    setOpenGroupId("");
    history.replaceState(null, "", "#design-md");
    window.scrollTo(0, 0);
  }

  function closeRaw() {
    setShowRaw(false);
    const hero = document.getElementById(ALL_SECTION_IDS[0]);
    setNavVisible(hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > 0);
    history.replaceState(null, "", "#");
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href === "#design-md") {
      e.preventDefault();
      openRaw();
      return;
    }
    if (showRaw) closeRaw();
  }

  // Open raw view when #design-md hash is navigated to directly
  useEffect(() => {
    function onHashChange() {
      if (location.hash === "#design-md") openRaw();
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll tracking: nav visibility + active section + accordion sync
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;

      if (!showRaw) {
        const hero = document.getElementById(ALL_SECTION_IDS[0]);
        setNavVisible(hero ? hero.getBoundingClientRect().bottom <= 0 : scrollY > 0);
      }

      let current = ALL_SECTION_IDS[0];
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollY >= top - 120) current = id;
        }
      }
      setActiveSection(current);

      const groupId = SECTION_TO_GROUP.get(current);
      if (groupId) setOpenGroupId(groupId);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showRaw]);

  return {
    showRaw,
    navVisible,
    activeSection,
    openGroupId,
    setOpenGroupId,
    openRaw,
    closeRaw,
    handleNavClick,
  };
}
