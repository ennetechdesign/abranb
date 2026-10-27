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
};

export default function BoxNoticesSlide({ notice }: { notice: BoxNoticesSlideProps }) {
  const content = <div className="flex cursor-pointer flex-col text-ink transition-colors duration-300 hover:bg-purple hover:text-white lg:flex-row rounded-[40px] bg-lilac box-slide">
    <picture className="h-50 w-full overflow-hidden rounded-[40px] object-cover lg:h-67.5 lg:min-w-97.5">
      <Image src={notice.foto} width={500} height={360} draggable={false} alt={notice.imageAlt ?? ""} className="h-full w-full rounded-[40px] object-cover transition-transform duration-500 hover:scale-110" />
    </picture>
    <div className="px-5 py-5 lg:min-w-110 lg:px-5">
      <h3 className="mb-2 hyphens-auto text-title font-bold">{notice.titulo}</h3>
      <p className="line-clamp-3 text-lead/relaxed">{notice.descricao}</p>
    </div>
  </div>;
  return notice.href ? <Link href={notice.href} className="block" aria-label={`Ler: ${notice.titulo}`}>{content}</Link> : <div>{content}</div>;
}
