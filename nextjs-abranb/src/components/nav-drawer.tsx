"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  navDrawerPages,
  navDrawerSections,
} from "@/config/nav";

export type NavDrawerProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

function drawerLinkClass(active: boolean) {
  return [
    "block w-full rounded-md px-2 py-2 text-center text-body transition-colors focus-visible:outline-offset-2",
    active ? "font-semibold text-button-primary" : "text-white hover:text-(--button-primary-hover)",
  ].join(" ");
}

export function NavDrawer({ id, open, onClose }: NavDrawerProps) {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const router = useRouter();
  const panelRef = useRef<HTMLElement>(null);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      onClose();
      const run = () => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${sectionId}`);
      };
      if (pathname === "/") {
        requestAnimationFrame(run);
      } else {
        router.push(`/#${sectionId}`);
      }
    },
    [onClose, pathname, router],
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const el = panelRef.current?.querySelector<HTMLElement>(
      "a, button",
    );
    queueMicrotask(() => el?.focus());
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 top-14 z-[55] bg-deep/55 backdrop-blur-[2px] md:top-16"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav_drawer_title")}
        className="fixed left-0 top-14 z-[60] flex h-[calc(100dvh-3.5rem)] w-[min(100%,22rem)] max-w-[85vw] flex-col overflow-y-auto bg-purple-muted/95 px-4 pb-8 pt-6 shadow-xl md:top-16 md:h-[calc(100dvh-4rem)]"
      >
        <section className="mb-10">
          <h3 className="mb-4 border-b border-button-primary pb-2 text-center text-lead font-bold text-button-primary">
            {t("nav_drawer_pages_heading")}
          </h3>
          <nav aria-label={t("nav_drawer_pages_heading")} className="flex flex-col gap-1">
            {navDrawerPages.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={drawerLinkClass(active)}
                  onClick={onClose}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </section>

        <section className="lg:hidden">
          <h3 className="mb-4 border-b border-button-primary pb-2 text-center text-lead font-bold text-button-primary ">
            {t("nav_drawer_sections_heading")}
          </h3>
          <nav
            aria-label={t("nav_drawer_sections_heading")}
            className="flex flex-col gap-1"
          >
            {navDrawerSections.map((item) => (
              <button
                key={item.sectionId}
                type="button"
                className={drawerLinkClass(false)}
                onClick={() => scrollToSection(item.sectionId)}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>
        </section>
      </aside>
    </>
  );
}
