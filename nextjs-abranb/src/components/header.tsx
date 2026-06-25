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
import { faUniversalAccess } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DRAWER_ID = "site-nav-drawer";

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
      "text-body font-semibold text-muted-foreground transition-colors focus-visible:outline-offset-2",
      active ? " text-title-decoration font-bold" : "hover:text-title-decoration ",
    ].join(" ");

  return (
    <>
      <header className="sticky top-0 z-70 h-20 border-b border-white/15 bg-background-hero shadow-md">
        <div className="flex justify-between relative w-full h-full max-md:max-w-400 items-center gap-3 md:gap-6 px-3.75 md:px-7.5">
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
              <LogoMark className="size-9 shrink-0 md:size-10"/>
              <span className="truncate text-heading font-medium uppercase tracking-wide hover:text-title-decoration transition-colors">
                ABRANB
              </span>
            </Link>
          </div>

          <div className="flex min-w-0 items-center justify-center md:justify-between">
            <div className="flex shrink-0 items-center gap-1 md:gap-2">
              <DropdownMenu
                  triggerVariant="purple"
                  triggerLabel={t("a11y_open_button")}
                  triggerIcon={<FontAwesomeIcon
                      icon={faUniversalAccess}
                      className="size-4 text-lg md:text-xl"
                      aria-hidden
                  />}
                  showChevron={false}
                  iconOnly={a11yIconOnly}
                  align="center"
                  ariaHasPopup="dialog"
                  panelRole="dialog"
                  triggerClassName="shadow-none"
                  panelClassName="min-w-75 max-w-80 sm:min-w-[500px] sm:max-w-[500px] overflow-x-hidden overflow-y-auto rounded-lg shadow-lg"
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
          <div className="flex min-w-0 items-center justify-end md:justify-between">
            <nav
                className="hidden items-center gap-5 xl:flex lg:gap-6"
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
