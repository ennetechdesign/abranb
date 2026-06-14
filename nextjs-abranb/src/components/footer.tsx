"use client";

import {
  faClipboardList,
  faEnvelope,
  faFileExcel,
  faGlobe,
  faIdCard,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { LogoMark } from "@/components/logo-mark";
import {
  footerProfessionalLinks,
  footerResearchLinks,
  footerSocialLinks,
  type FooterProfessionalLink,
  type FooterSocialLink,
} from "@/config/footer";

const socialIcons: Record<FooterSocialLink["id"], IconDefinition> = {
  instagram: faInstagram,
  facebook: faFacebook,
  email: faEnvelope,
};

const professionalIcons: Record<
  FooterProfessionalLink["icon"],
  IconDefinition
> = {
  clipboard: faClipboardList,
  spreadsheet: faFileExcel,
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function FooterLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const external = isExternalHref(href);

  if (external) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function SectionHeading({
  title,
  icon,
  className,
}: {
  title: string;
  icon: IconDefinition;
  className?: string;
}) {
  return (
    <h2
      className={[
        "text-lead flex items-center gap-2 font-bold text-footer-heading",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{title}</span>
      <FontAwesomeIcon icon={icon} aria-hidden className="size-4 shrink-0" />
    </h2>
  );
}

export function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label={t("footer_region_label")}
      className="bg-footer-bg text-body mt-auto"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-5 py-10 md:flex-row md:items-start md:justify-between md:gap-8 md:py-12">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link
            href="/"
            className="rounded-md focus-visible:outline-offset-2"
          >
            <LogoMark className="size-16 shrink-0 md:size-20" />
          </Link>
          <nav aria-label={t("footer_social_nav_label")} className="max-w-50 text-right md:w-full">
            <ul className="flex items-center gap-3">
              {footerSocialLinks.map((link) => (
                <li key={link.id}>
                  <FooterLink
                    href={link.href}
                    ariaLabel={t(link.labelKey)}
                    className="flex size-10 items-center justify-center rounded-full border-2 border-footer-social-ring text-footer-heading transition-opacity hover:opacity-80 focus-visible:outline-offset-2"
                  >
                    <FontAwesomeIcon
                      icon={socialIcons[link.id]}
                      aria-hidden
                      className="size-4"
                    />
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav
          aria-label={t("footer_professionals_nav_label")}
          className="flex max-w-50 text-right flex-col items-center gap-3 md:items-end md:min-w-[240px]"
        >
          <SectionHeading
            title={t("footer_professionals_heading")}
            icon={faIdCard}
            className="justify-center md:justify-end"
          />
          <ul className="flex flex-col gap-2 w-full">
            {footerProfessionalLinks.map((link) => (
              <li key={link.id} className="text-right">
                <FooterLink
                  href={link.href}
                  className="inline-flex items-center gap-2 text-footer-link transition-opacity hover:opacity-80 focus-visible:outline-offset-2"
                >
                  <span>
                    {t(link.labelKey)}
                    <br />
                    {link.noteKey ? (
                      <span className="text-caption ml-1">
                        {t(link.noteKey)}
                      </span>
                    ) : null}
                  </span>
                  <FontAwesomeIcon
                    icon={professionalIcons[link.icon]}
                    aria-hidden
                    className="size-3.5 shrink-0"
                  />
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          aria-label={t("footer_research_nav_label")}
          className="flex max-w-50 text-right flex-col items-center md:items-end md:min-w-[270px]"
        >
          <SectionHeading
            title={t("footer_research_heading")}
            icon={faMagnifyingGlass}
            className="justify-center md:justify-end"
          />
          <ul className="flex flex-col gap-2 w-full">
            {footerResearchLinks.map((link) => (
              <li key={link.id} className="text-right">
                <FooterLink
                  href={link.href}
                  className="inline-flex items-center gap-2 text-footer-link-research transition-opacity hover:opacity-80 focus-visible:outline-offset-2"
                >
                  <span>{link.label}</span>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    aria-hidden
                    className="size-3.5 shrink-0"
                  />
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="px-5 py-6 text-center">
        <p className="text-caption text-footer-link-research">
          <strong>ABRANB</strong> © {year} | {t("footer_copyright_motto")}
        </p>
      </div>
    </footer>
  );
}
