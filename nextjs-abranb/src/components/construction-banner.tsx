"use client";

import { usePathname } from "next/navigation";

/**
 * The blog lives under /blog, and individual posts at a single top-level segment (/[slug]).
 * Every other top-level section (home, /sobre/*) has its own route and no notice.
 */
function isBlogPath(pathname: string) {
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return true;
  return pathname !== "/" && !pathname.slice(1).includes("/") && !pathname.startsWith("/sobre");
}

/** Yellow-and-black notice pinned above the header on blog pages (it sticks together with the header). */
export function ConstructionBanner({ message }: { message: string }) {
  const pathname = usePathname();
  if (!isBlogPath(pathname)) return null;

  return (
    <div className="construction-banner" role="note">
      <span aria-hidden className="construction-banner-icon">
        ⚠
      </span>
      <p>{message}</p>
    </div>
  );
}
