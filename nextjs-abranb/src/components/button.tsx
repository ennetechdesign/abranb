import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { ChevronIcon } from "@/components/chevron-icon";

const sizeConfig = {
  small: {
    text: "text-caption",
    padding: "px-3 py-2",
    gap: "gap-1",
    chevron: 12,
  },
  medium: {
    text: "text-body",
    padding: "px-4 py-2.5",
    gap: "gap-1.5",
    chevron: 14,
  },
  large: {
    text: "text-lead",
    padding: "px-5 py-3",
    gap: "gap-2",
    chevron: 18,
  },
} as const;

function variantClasses(variant: "primary" | "secondary") {
  if (variant === "primary") {
    return [
      "bg-button-primary text-ink",
      "hover:bg-button-primary-hover",
      "active:bg-button-primary-active",
      "active:shadow-[inset_0_0_0_1px_var(--button-primary-active-ring)]",
    ];
  }
  return [
    "bg-button-secondary text-white",
    "hover:bg-button-secondary-hover",
    "active:bg-button-secondary-active",
    "active:shadow-[inset_0_0_0_1px_var(--button-secondary-active-ring)]",
  ];
}

export type ButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant: "primary" | "secondary";
  size?: keyof typeof sizeConfig;
  showChevron?: boolean;
  openInNewTab?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "medium",
  showChevron = true,
  openInNewTab = false,
  className,
  children,
  target: targetProp,
  rel: relProp,
  ...rest
}: ButtonProps) {
  const target = openInNewTab ? "_blank" : targetProp;
  const opensNewTab = target === "_blank";
  const rel = opensNewTab
    ? ["noopener", "noreferrer", relProp].filter(Boolean).join(" ")
    : relProp;

  const s = sizeConfig[size];

  return (
    <Link
      {...rest}
      target={target}
      rel={rel}
      className={[
        "inline-flex items-center rounded-full font-bold no-underline",
        "transition-[background-color,box-shadow] duration-150 ease-out",
        s.text,
        s.padding,
        s.gap,
        ...variantClasses(variant),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {showChevron ? (
        <ChevronIcon direction="right" size={s.chevron} />
      ) : null}
    </Link>
  );
}
