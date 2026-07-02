"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useMobileMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((current) => !current), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return {
    close,
    open,
    setOpen,
    toggle,
  };
};
