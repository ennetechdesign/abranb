"use client";

import { useTranslation } from "react-i18next";

export type SearchLaunchButtonProps = {
  className?: string;
  onClick?: () => void;
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${className} text-background`}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm9 2-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchLaunchButton({
  className,
  onClick,
}: SearchLaunchButtonProps) {
  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className={[
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-title-decoration text-ink transition-opacity hover:opacity-95 focus-visible:outline-offset-2 md:size-11",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={t("nav_search_open")}
      onClick={onClick}
    >
      <SearchIcon />
    </button>
  );
}
