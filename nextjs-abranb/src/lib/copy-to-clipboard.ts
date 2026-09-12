/**
 * Copies `text` to the clipboard. Uses the async Clipboard API when
 * available (secure contexts), then falls back to `document.execCommand`
 * for older Android WebViews and iOS Safari that lack `navigator.clipboard`.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Insecure context, missing permission, or a stub that rejects.
    }
  }

  if (typeof document === "undefined") return false;

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.setAttribute("aria-hidden", "true");
  input.style.position = "fixed";
  input.style.top = "0";
  input.style.left = "-9999px";
  document.body.appendChild(input);

  const selection = document.getSelection();
  const previousRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  input.focus();
  input.select();
  input.setSelectionRange(0, text.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(input);

  if (previousRange && selection) {
    selection.removeAllRanges();
    selection.addRange(previousRange);
  } else {
    selection?.removeAllRanges();
  }

  return copied;
}
