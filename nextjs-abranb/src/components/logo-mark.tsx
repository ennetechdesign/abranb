import Image from "next/image";

/** Site logo from `public/logo.jpeg`. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.jpeg"
      alt=""
      width={256}
      height={256}
      className={["object-contain", className].filter(Boolean).join(" ")}
      priority
    />
  );
}
