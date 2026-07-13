"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type DropdownMenuItem = {
  href: string;
  label: ReactNode;
};

export type DropdownMenuProps = {
  triggerVariant: "purple" | "text" | "textOnPurple";
  triggerLabel: ReactNode;
  triggerIcon?: ReactNode;
  /** Defaults: true for `text` / `textOnPurple`, false for `purple`. */
  showChevron?: boolean;
  align: "start" | "center" | "end";
  /** Classes on the positioned panel wrapper (width, max-height, scroll, etc.). */
  panelClassName?: string;
  /** When non-empty, renders the default gold rounded link list inside the panel. */
  items?: DropdownMenuItem[];
  /** Custom panel body; used when `items` is empty or undefined. */
  children?: ReactNode;
  ariaHasPopup: "menu" | "dialog";
  panelRole: "menu" | "dialog" | "region";
  /** `aria-label` on the panel when not using `aria-labelledby`. */
  panelAriaLabel?: string;
  /** Extra classes on the root `relative` wrapper. */
  className?: string;
  /** Extra classes on the trigger button (escape hatch). */
  triggerClassName?: string;
  /**
   * Purple trigger: show only the icon in the circle; `triggerLabel` is still
   * exposed to screen readers via `sr-only`.
   */
  iconOnly?: boolean;
};

function focusFirstFocusable(container: HTMLElement) {
  const el = container.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  el?.focus();
}

function ChevronDown({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      className={[
        "size-3.5 shrink-0 transition-transform duration-150",
        open ? "rotate-180" : "",
        className,
      ].filter(Boolean)
        .join(" ")}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.25 4.5 6 8.25 9.75 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function triggerVariantClasses(
  variant: DropdownMenuProps["triggerVariant"],
  iconOnly: boolean,
) {
  if (variant === "purple") {
    if (iconOnly) {
      return "text-body flex size-11 shrink-0 items-center justify-center rounded-md font-medium hover:text-title-decoration cursor-pointer transition-colors focus-visible:outline-offset-2";
    }
    return "text-body flex items-center cursor-pointer rounded-md px-4 py-2.5 font-medium transition-colors hover:text-title-decoration transition-colors focus-visible:outline-offset-2";
  }
  if (variant === "textOnPurple") {
    return "text-body flex items-center gap-1 font-semibold transition-colors text-muted-foreground hover:text-title-decoration cursor-pointer focus-visible:outline-offset-2";
  }
  return "text-body text-muted-foreground flex items-center gap-1 font-medium transition-colors hover:text-foreground focus-visible:outline-offset-2";
}

function alignClasses(align: NonNullable<DropdownMenuProps["align"]>) {
  if (align === "center") {
    return "right-0 max-sm:-translate-y-[15px] -translate-x-[10px] sm:left-1/2 sm:-translate-x-1/2";
  }
  if (align === "end") {
    return "right-0";
  }
  return "left-0";
}

export function DropdownMenu({
  triggerVariant,
  triggerLabel,
  triggerIcon,
  showChevron: showChevronProp,
  align = "center",
  panelClassName,
  items,
  children,
  ariaHasPopup,
  panelRole,
  panelAriaLabel,
  className,
  triggerClassName,
  iconOnly = false,
}: DropdownMenuProps) {
  const showChevron =
    showChevronProp ??
    (triggerVariant === "text" || triggerVariant === "textOnPurple");

  const [open, setOpen] = useState(false);
  const panelId = useId();
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (panel) {
      focusFirstFocusable(panel);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  const toggle = () => {
    setOpen((v) => {
      if (v) {
        queueMicrotask(() => triggerRef.current?.focus());
      }
      return !v;
    });
  };

  const hasItems = Boolean(items && items.length > 0);
  const panelLabelledBy = panelRole === "dialog" ? labelId : undefined;
  const list = items ?? [];

  return (
    <div ref={rootRef} className={["sm:relative", className].filter(Boolean).join(" ")}>
      <button
        ref={triggerRef}
        type="button"
        className={[
          triggerVariantClasses(triggerVariant, iconOnly),
          triggerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup={ariaHasPopup}
        onClick={toggle}
        onMouseEnter={() => setOpen(true)}
      >
        {triggerVariant === "purple" && triggerIcon ? (
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full"
            aria-hidden
          >
            {triggerIcon}
          </span>
        ) : null}
        <span
          id={labelId}
          className={`${iconOnly && triggerVariant === "purple" ? "sr-only" : undefined}`}
        >
          {triggerLabel}
        </span>
        {showChevron ? <ChevronDown open={open} /> : null}
      </button>
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role={panelRole}
          aria-modal={panelRole === "dialog" ? "false" : undefined}
          aria-labelledby={panelLabelledBy}
          aria-label={panelLabelledBy ? undefined : panelAriaLabel}
          className={[
            "absolute top-full z-50 mt-2",
            alignClasses(align),
            panelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseLeave={close}
        >
          {hasItems ? (
            <div 
              className="min-w-[12rem] rounded-3xl bg-button-primary p-4 text-ink shadow-lg">
              <div className="flex flex-col items-center gap-3 text-center text-body font-medium">
                {list.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role={panelRole === "menu" ? "menuitem" : undefined}
                    className="hover:underline focus-visible:underline no-underline outline-none"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      ) : null}
    </div>
  );
}
