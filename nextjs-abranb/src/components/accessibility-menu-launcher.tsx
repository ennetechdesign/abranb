"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { AccessibilityMenu } from "@/components/accessibility-menu";
import type { ColorScheme, FontFamily, TextSize } from "@/lib/a11y-preferences";

type AccessibilityMenuLauncherProps = {
  initialColorScheme: ColorScheme;
  initialFontFamily: FontFamily;
  initialTextSize: TextSize;
};

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

function focusFirstFocusable(container: HTMLElement) {
  const el = container.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  el?.focus();
}

export function AccessibilityMenuLauncher({
  initialColorScheme,
  initialFontFamily,
  initialTextSize,
}: AccessibilityMenuLauncherProps) {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
        buttonRef.current?.focus();
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
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  const toggle = () => {
    setOpen((v) => {
      if (v) {
        queueMicrotask(() => buttonRef.current?.focus());
      }
      return !v;
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex max-w-3xl justify-end px-8 pt-4 pb-3">
        <div ref={rootRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="bg-purple text-body flex items-center gap-2.5 rounded-md px-4 py-2.5 font-medium text-white shadow-sm transition-opacity hover:opacity-95 focus-visible:outline-offset-2"
            aria-expanded={open}
            aria-controls={panelId}
            aria-haspopup="dialog"
            onClick={toggle}
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-purple"
              aria-hidden
            >
              <AccessibilityTriggerIcon className="text-purple" />
            </span>
            <span id={labelId}>{t("a11y_open_button")}</span>
          </button>
          {open ? (
            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="false"
              aria-labelledby={labelId}
              className="absolute right-0 top-full z-50 mt-2 max-h-[min(85vh,calc(100dvh-5rem))] w-[min(100vw-2rem,42rem)] min-w-[min(100vw-2rem,20rem)] overflow-y-auto rounded-lg shadow-lg"
            >
              <AccessibilityMenu
                initialColorScheme={initialColorScheme}
                initialFontFamily={initialFontFamily}
                initialTextSize={initialTextSize}
                className="max-w-none shadow-md"
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
