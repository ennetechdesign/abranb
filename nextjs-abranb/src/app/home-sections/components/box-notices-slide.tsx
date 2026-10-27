"use client";

import Link from "next/link";
import Image from "next/image";

type BoxNoticesSlideProps = {
  id: number;
  foto: string;
  titulo: string;
  descricao: string;
  href?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

export default function BoxNoticesSlide({ notice }: { notice: BoxNoticesSlideProps }) {
  const content = <div className="box-slide group flex h-[360px] w-[86vw] min-w-0 max-w-[850px] flex-col overflow-hidden rounded-[30px] bg-lilac text-ink transition-colors duration-300 hover:bg-purple hover:text-white sm:h-[360px] sm:rounded-[40px] lg:h-[270px] lg:flex-row">
    <picture className={`relative block h-[190px] w-full shrink-0 overflow-hidden bg-[#eee] sm:h-[190px] lg:h-full lg:w-[40%]`}>
      <Image src={notice.foto} fill sizes="(max-width: 1023px) 86vw, 340px" draggable={false} alt={notice.imageAlt ?? ""} className={`h-full w-full ${notice.imageFit === "contain" ? "object-contain" : "object-cover transition-transform duration-500 group-hover:scale-105"}`} />
    </picture>
    <div className="flex h-[170px] min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden px-4 py-3 text-left sm:h-[170px] sm:px-5 sm:py-4 lg:h-full lg:px-6 lg:py-5">
      <h3 className="mb-2 line-clamp-2 break-words text-base font-bold leading-tight sm:text-xl lg:text-title">{notice.titulo}</h3>
      <p className="line-clamp-3 break-words text-sm leading-relaxed sm:text-base lg:text-body">{notice.descricao}</p>
    </div>
  </div>;
  return notice.href ? <Link href={notice.href} className="block w-[86vw] min-w-0 max-w-[850px] shrink-0 snap-center" aria-label={`Ler: ${notice.titulo}`}>{content}</Link> : <div className="w-[86vw] min-w-0 max-w-[850px] shrink-0 snap-center">{content}</div>;
}
