"use client";

import { useEffect } from "react";

/**
 * Drops the `no-js` class from `<html>` once React hydrates.
 *
 * CSS keys hover/focus fallbacks off `html.no-js` for controls that otherwise
 * need JS, so the class has to survive whenever the bundle fails to load or
 * parse - common on the outdated mobile browsers this site has to support.
 */
export function JsEnabled() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  return null;
}
