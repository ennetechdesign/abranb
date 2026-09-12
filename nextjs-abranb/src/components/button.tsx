import Link from "next/link";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";

import { ChevronIcon } from "@/components/chevron-icon";

export type ButtonVariant =
  | "solid-gold"
  | "solid-purple"
  | "gold-to-purple"
  | "purple-to-gold"
  | "outline-gold"
  | "outline-gold-to-purple"
  | "outline-gold-to-purple-strong"
  | "docs-outer"
  | "docs-reports";

export type ButtonTextColor = "deep" | "paper" | "paper-deep";
export type ButtonSize = "standard" | "contact";
export type ButtonTextSize = "lead" | "body";
export type ButtonTarget = "_self" | "_blank";

const docsVariants = new Set<ButtonVariant>(["docs-outer", "docs-reports"]);

const variantClassMap: Record<Exclude<ButtonVariant, "docs-outer" | "docs-reports">, string> = {
  "solid-gold": "bg-gold/70 hover:brightness-115",
  "solid-purple": "bg-purple/50 border-1 border-purple hover:bg-purple",
  "gold-to-purple": `
    bg-gold/50 border hover:bg-gold border-1 border-gold
    [html[data-color-scheme='night']_&]:bg-purple/50 [html[data-color-scheme='night']_&]:hover:bg-purple
    [html[data-color-scheme='night']_&]:border-purple [html[data-color-scheme='night']_&]:text-paper
    [html[data-color-scheme='high-contrast']_&]:bg-purple/50 [html[data-color-scheme='high-contrast']_&]:border-purple
    [html[data-color-scheme='high-contrast']_&]:hover:bg-purple [html[data-color-scheme='high-contrast']_&]:text-paper
  `,
  "purple-to-gold": `
    bg-purple/50 border hover:bg-purple border-1 border-purple
    [html[data-color-scheme='night']_&]:bg-gold/50 [html[data-color-scheme='night']_&]:hover:bg-gold
    [html[data-color-scheme='night']_&]:border-gold
    [html[data-color-scheme='high-contrast']_&]:bg-gold/50 [html[data-color-scheme='high-contrast']_&]:border-gold
    [html[data-color-scheme='high-contrast']_&]:hover:bg-gold
  `,
  "outline-gold": "bg-gold/20 hover:brightness-115 border-1 border-gold",
  "outline-gold-to-purple": `
    bg-gold/20 hover:brightness-115 border-1 border-gold
    [html[data-color-scheme='night']_&]:bg-purple/20 [html[data-color-scheme='night']_&]:hover:bg-purple
    [html[data-color-scheme='night']_&]:border-purple [html[data-color-scheme='night']_&]:text-paper
    [html[data-color-scheme='high-contrast']_&]:bg-purple/20 [html[data-color-scheme='high-contrast']_&]:border-purple
    [html[data-color-scheme='high-contrast']_&]:hover:bg-purple [html[data-color-scheme='high-contrast']_&]:text-paper
  `,
  "outline-gold-to-purple-strong": `
    border-2 border-gold bg-gold/50
    [html[data-color-scheme='night']_&]:bg-purple/50 [html[data-color-scheme='night']_&]:hover:bg-purple
    [html[data-color-scheme='night']_&]:border-purple [html[data-color-scheme='night']_&]:text-paper
    [html[data-color-scheme='high-contrast']_&]:bg-purple/50 [html[data-color-scheme='high-contrast']_&]:border-purple
    [html[data-color-scheme='high-contrast']_&]:hover:bg-purple [html[data-color-scheme='high-contrast']_&]:text-paper
  `,
};

const sizeClassMap: Record<ButtonSize, string> = {
  standard: "py-2.5 px-5 md:py-4 md:px-7 rounded-4xl",
  contact: "h-16.5 px-12.5 rounded-[50px]",
};

const textColorClassMap: Record<ButtonTextColor, string> = {
  deep: "text-deep",
  paper: "text-paper",
  "paper-deep": "text-paper-deep",
};

const textSizeClassMap: Record<ButtonTextSize, string> = {
  lead: "text-lead",
  body: "text-body",
};

export function FileLinesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </svg>
  );
}

function resolveExternal(href: string | undefined, target: ButtonTarget | undefined) {
  const isExternalHref = !!href && /^https?:\/\//.test(href);
  const opensNewTab = target === "_blank" || isExternalHref;
  return {
    target: opensNewTab ? "_blank" : target,
    rel: opensNewTab ? "noopener noreferrer" : undefined,
  };
}

export type ButtonProps = {
  variant: ButtonVariant;
  href?: string;
  type?: "button" | "submit";
  size?: ButtonSize;
  textColor?: ButtonTextColor;
  textSize?: ButtonTextSize;
  target?: ButtonTarget;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  "aria-label"?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "onClick" | "aria-label">;

export default function Button({
  variant,
  href,
  type = "button",
  size = "standard",
  textColor = "deep",
  textSize = "lead",
  target: targetProp,
  icon,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
  ...rest
}: ButtonProps) {
  const isDocs = docsVariants.has(variant);
  const { target, rel } = resolveExternal(href, targetProp);

  const classes = isDocs
    ? ["docs-pill w-fit", className].filter(Boolean).join(" ")
    : [
        "w-fit inline-flex items-center justify-center gap-2 font-bold cursor-pointer no-underline",
        sizeClassMap[size],
        textColorClassMap[textColor],
        textSizeClassMap[textSize],
        variantClassMap[variant as Exclude<ButtonVariant, "docs-outer" | "docs-reports">],
        className,
      ]
        .filter(Boolean)
        .join(" ");

  const content = (
    <>
      {icon}
      {isDocs ? <span className="docs-pill-label">{children}</span> : children}
      {!icon && !isDocs ? <ChevronIcon direction="right" size={16} /> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
