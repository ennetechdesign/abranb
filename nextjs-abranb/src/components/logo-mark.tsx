import Image from "next/image";

/** Site logo from `public/logo.jpeg`. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-light.svg"
      alt=""
      width={50}
      height={50}
      className={"w-12.5 h-12.5 " + ["object-contain", className].filter(Boolean).join(" ")}
      priority
    />
  );
}
