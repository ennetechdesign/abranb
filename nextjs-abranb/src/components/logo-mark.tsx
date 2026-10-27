import Image from "next/image";

const HIDE_ON_DARK =
  "[html[data-color-scheme='night']_&]:hidden [html[data-color-scheme='high-contrast']_&]:hidden";
const SHOW_ON_DARK =
  "[html[data-color-scheme='night']_&]:block [html[data-color-scheme='high-contrast']_&]:block";

/** Site logo. With `themed`, shows `logo-light.svg` on the light theme and `logo-dark.svg` on the others. */
export function LogoMark({ className, themed }: { className?: string; themed?: boolean }) {
  const classes = "w-12.5 h-12.5 " + ["object-contain", className].filter(Boolean).join(" ");

  if (!themed) {
    return <Image src="/logo-light.svg" alt="" width={50} height={50} className={classes} priority />;
  }

  return (
    <>
      <Image src="/logo-light.svg" alt="" width={50} height={50} className={`${classes} ${HIDE_ON_DARK}`} priority />
      <Image src="/logo-dark.svg" alt="" width={50} height={50} className={`${classes} hidden ${SHOW_ON_DARK}`} priority />
    </>
  );
}
