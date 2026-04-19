"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AccessibilityMenu } from "@/components/accessibility-menu";
import { DropdownMenu } from "@/components/dropdown-menu";
import { HamburgerMenuTrigger } from "@/components/hamburger-menu-trigger";
import { LogoMark } from "@/components/logo-mark";
import { NavDrawer } from "@/components/nav-drawer";
import { SearchLaunchButton } from "@/components/search-launch-button";
import {
  navLibraryDropdownItems,
  navAboutDropdownItems,
} from "@/config/nav";
import type { ColorScheme, FontFamily, TextSize } from "@/lib/a11y-preferences";

const DRAWER_ID = "site-nav-drawer";

function AccessibilityTriggerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Zm1.2 6.2H10.8c-.7 0-1.3.4-1.6 1l-2.1 4.4a.9.9 0 0 0 1.6.8l1.8-3.7h.9l1.8 3.7a.9.9 0 1 0 1.6-.8l-2.1-4.4c-.3-.6-.9-1-1.6-1ZM8.5 16.5l-2 2.3a.9.9 0 1 0 1.4 1.2l2.3-2.7a1.4 1.4 0 0 1 1.1-.5h.4c.4 0 .8.2 1.1.5l2.3 2.7a.9.9 0 1 0 1.4-1.2l-2-2.3a3.1 3.1 0 0 0-2.4-1.1h-.4a3.1 3.1 0 0 0-2.4 1.1Z" />
    </svg>
  );
}

export type SiteHeaderProps = {
  initialColorScheme: ColorScheme;
  initialFontFamily: FontFamily;
  initialTextSize: TextSize;
};

export function Header({
  initialColorScheme,
  initialFontFamily,
  initialTextSize,
}: SiteHeaderProps) {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [a11yIconOnly, setA11yIconOnly] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setA11yIconOnly(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const sobreItems = navAboutDropdownItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const bibliotecaItems = navLibraryDropdownItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));

  const navLinkClass = (active: boolean) =>
    [
      "text-body font-semibold transition-colors focus-visible:outline-offset-2",
      active ? "text-button-primary" : "text-white hover:opacity-90",
    ].join(" ");

  return (
    <>
      <header className="sticky top-0 z-[70] border-b border-white/15 bg-purple text-white shadow-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-4 md:h-16 md:gap-6 md:px-6">
          <div className="flex min-w-0 shrink-0 items-center gap-2 md:gap-4">
            <HamburgerMenuTrigger
                ariaControls={DRAWER_ID}
                ariaExpanded={drawerOpen}
                open={drawerOpen}
                onClick={() => setDrawerOpen((o) => !o)}
            />
            <Link
                href="/"
                className="flex min-w-0 items-center gap-2 rounded-md focus-visible:outline-offset-2"
            >
              {/* TODO: substituir pelo logo da ABRANB*/}
              <LogoMark className="size-9 shrink-0 md:size-10"/>
              <span className="truncate text-heading font-bold uppercase tracking-wide">
                ABRANB
              </span>
            </Link>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center md:justify-between">
            <div className="flex shrink-0 items-center gap-1 md:gap-2">
              <DropdownMenu
                  triggerVariant="purple"
                  triggerLabel={t("a11y_open_button")}
                  triggerIcon={<AccessibilityTriggerIcon className="text-purple"/>}
                  showChevron={false}
                  iconOnly={a11yIconOnly}
                  align="center"
                  ariaHasPopup="dialog"
                  panelRole="dialog"
                  panelClassName="min-w-75 max-w-80 md:min-w-[500px] md:max-w-[500px] overflow-x-hidden overflow-y-auto rounded-lg shadow-lg"
              >
                <AccessibilityMenu
                    initialColorScheme={initialColorScheme}
                    initialFontFamily={initialFontFamily}
                    initialTextSize={initialTextSize}
                    className="shadow-md"
                />
              </DropdownMenu>
            </div>
          </div>
          <div className="flex min-w-0 flex-2 items-center justify-end md:justify-between">
            <nav
                className="hidden items-center gap-5 md:flex lg:gap-6"
                aria-label={t("nav_main_label")}
            >
              <Link href="/" className={navLinkClass(pathname === "/")}>
                {t("nav_page_home")}
              </Link>
              <DropdownMenu
                  triggerVariant="textOnPurple"
                  triggerLabel={t("nav_about")}
                  align="center"
                  ariaHasPopup="menu"
                  panelRole="menu"
                  panelAriaLabel={t("nav_sobre_menu_aria")}
                  items={sobreItems}
              />
              <DropdownMenu
                  triggerVariant="textOnPurple"
                  triggerLabel={t("nav_biblioteca")}
                  align="center"
                  ariaHasPopup="menu"
                  panelRole="menu"
                  panelAriaLabel={t("nav_biblioteca_menu_aria")}
                  items={bibliotecaItems}
              />
              <Link
                  href="/blog"
                  className={navLinkClass(pathname.startsWith("/blog"))}
              >
                {t("nav_page_blog")}
              </Link>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <SearchLaunchButton/>
          </div>
        </div>
      </header>
      <NavDrawer
          id={DRAWER_ID}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
