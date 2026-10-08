"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scrolls to `location.hash` on the home page (e.g. after `router.push("/#id")`). */
export function HomeScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [pathname]);

  return null;
}
