/**
 * Each direction is drawn as its own path rather than rotated with CSS, so the
 * icon renders correctly on browsers without the standalone `rotate` property.
 */
const directionPaths = {
  down: "M2.25 4.5 6 8.25 9.75 4.5",
  right: "M4.5 2.25 8.25 6 4.5 9.75",
} as const;

export function ChevronIcon({
  direction = "down",
  size = 16,
  strokeWidth = 1.75,
  className,
}: {
  direction?: keyof typeof directionPaths;
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
      className={["shrink-0", className].filter(Boolean).join(" ")}
    >
      <path
        d={directionPaths[direction]}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
