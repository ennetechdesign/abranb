"use client";

import { useTranslation } from "react-i18next";

export type HamburgerMenuTriggerProps = {
  className?: string;
  /** Reserved for the future drawer panel `id`. */
  ariaControls?: string;
  /** Reflects drawer open state when wired. */
  ariaExpanded?: boolean;
  /** When true, shows a close (X) icon instead of the hamburger. */
  open?: boolean;
  onClick?: () => void;
  /** Overrides default i18n label when closed. */
  ariaLabel?: string;
  /** Overrides default i18n label when `open` is true. */
  ariaLabelWhenOpen?: string;
};

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HamburgerMenuTrigger({
  className,
  ariaControls,
  ariaExpanded = false,
  open = false,
  onClick,
  ariaLabel,
  ariaLabelWhenOpen,
}: HamburgerMenuTriggerProps) {
  const { t } = useTranslation("common");
  const label =
    open
      ? (ariaLabelWhenOpen ?? t("nav_hamburger_close_menu"))
      : (ariaLabel ?? t("nav_hamburger_open_menu"));

  return (
    <button
      type="button"
      className={[
        "inline-flex cursor-pointer size-10 items-center justify-center rounded-md text-current transition-transform duration-200 hover:scale-115 focus-visible:outline-offset-2 md:size-11",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={onClick}
    >
      {open ? <CloseIcon /> : <HamburgerIcon />}
    </button>
  );
}
