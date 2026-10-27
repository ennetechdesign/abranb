type StatusIconName = 'spinner' | 'check' | 'error';

const paths = {
    check: 'M3 8.5 6.5 12 13 4.5',
    error: 'M4 4 12 12M12 4 4 12',
} as const;

export function StatusIcon({
    name,
    size = 18,
    className,
}: {
    name: StatusIconName;
    size?: number;
    className?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className={["shrink-0", name === "spinner" ? "status-spinner" : "", className]
                .filter(Boolean)
                .join(" ")}
        >
            {name === 'spinner' ? (
                <path d="M8 2a6 6 0 1 0 6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            ) : (
                <path
                    d={paths[name]}
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}
