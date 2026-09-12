export function ChevronIcon({
  direction = "down",
  size = 16,
  strokeWidth = 1.75,
  className,
}: {
  direction?: "down" | "right";
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={["shrink-0", direction === "right" ? "-rotate-90" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <path
        d="M2.25 4.5 6 8.25 9.75 4.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
