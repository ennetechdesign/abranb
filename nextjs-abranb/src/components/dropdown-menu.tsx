"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { ChevronIcon } from "@/components/chevron-icon";

/** Grace period so the pointer can cross the gap between trigger and panel. */
const HOVER_CLOSE_DELAY_MS = 150;

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
  /**
   * Open on mouse hover in addition to click. Ignored for touch and pen input,
   * which keep the click-to-toggle behaviour.
   */
  openOnHover?: boolean;
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
    <ChevronIcon
      size={14}
      className={[
        "transition-transform duration-150",
        open ? "rotate-180" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
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
  openOnHover = false,
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
  const closeTimerRef = useRef<number | null>(null);
  /** Hovering must not steal focus, so only click and keyboard opt in. */
  const focusPanelOnOpenRef = useRef(false);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const close = useCallback(() => {
    cancelScheduledClose();
    setOpen(false);
  }, [cancelScheduledClose]);

  /** Returns focus to the trigger only when focus sits inside the menu. */
  const closeAndRestoreFocus = useCallback(() => {
    const focusWasInside =
      rootRef.current?.contains(document.activeElement) ?? false;
    close();
    if (focusWasInside) {
      triggerRef.current?.focus();
    }
  }, [close]);

  useEffect(() => cancelScheduledClose, [cancelScheduledClose]);

  useEffect(() => {
    if (!open || !focusPanelOnOpenRef.current) return;
    focusPanelOnOpenRef.current = false;
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
        closeAndRestoreFocus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeAndRestoreFocus]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        closeAndRestoreFocus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeAndRestoreFocus]);

  const toggle = () => {
    if (open) {
      close();
      triggerRef.current?.focus();
      return;
    }
    focusPanelOnOpenRef.current = true;
    cancelScheduledClose();
    setOpen(true);
  };

  const handlePointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!openOnHover || e.pointerType !== "mouse") return;
    cancelScheduledClose();
    setOpen(true);
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!openOnHover || e.pointerType !== "mouse") return;
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      // A keyboard user may have tabbed into the panel meanwhile.
      if (rootRef.current?.contains(document.activeElement)) return;
      setOpen(false);
    }, HOVER_CLOSE_DELAY_MS);
  };

  const hasItems = Boolean(items && items.length > 0);
  const panelLabelledBy = panelRole === "dialog" ? labelId : undefined;
  const list = items ?? [];

  return (
    <div
      ref={rootRef}
      className={["sm:relative", className].filter(Boolean).join(" ")}
      data-dropdown-hoverable={openOnHover ? "" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
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
      {open || openOnHover ? (
        <div
          ref={panelRef}
          id={panelId}
          role={panelRole}
          aria-modal={panelRole === "dialog" ? "false" : undefined}
          aria-labelledby={panelLabelledBy}
          aria-label={panelLabelledBy ? undefined : panelAriaLabel}
          data-dropdown-panel
          data-open={open}
          className={[
            "absolute top-full z-50 mt-2",
            alignClasses(align),
            panelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {hasItems ? (
            <div className="min-w-[12rem] rounded-3xl border border-nav-dropdown-border bg-nav-dropdown-bg p-4 text-nav-dropdown-fg shadow-lg">
              <div className="flex flex-col items-center gap-3 text-center text-body font-medium">
                {list.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role={panelRole === "menu" ? "menuitem" : undefined}
                    className="no-underline outline-none transition-colors hover:text-nav-dropdown-hover focus-visible:text-nav-dropdown-hover"
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
