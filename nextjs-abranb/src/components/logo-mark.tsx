/** Compact brand mark: triangular wedges in brand colors (placeholder for final artwork). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="18" cy="18" r="17" fill="#9c5fd9" />
      <path d="M18 2 L32 28 L4 28 Z" fill="#f2c230" opacity={0.95} />
      <path d="M18 10 L26 26 H10 Z" fill="#fffefb" opacity={0.9} />
    </svg>
  );
}
