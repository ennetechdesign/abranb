"use client";

import BoxNoticesSlide from "./box-notices-slide";
import { useCarousel } from "@/hooks/useCarousel";

export type SlideShowNotice = {
  id: number;
  foto: string;
  titulo: string;
  descricao: string;
  href?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

const homeNotices: SlideShowNotice[] = [
  { id: 1, foto: "/images/encontroNbRJ.jpg", titulo: "Encontro de Não-Bináries do RJ", descricao: "Reunião presencial da ABRANB para organizar o encontro de pessoas não-binárias do Rio de Janeiro." },
  { id: 2, foto: "/images/reuniaoABRANB.jpg", titulo: "Reunião com o Coletive Não-Binárie da Paraíba", descricao: "Discussão sobre acesso ao registro civil e outras demandas da população não-binária na Paraíba." },
  { id: 3, foto: "/images/entregaPanfletos.jpg", titulo: "Compartilhamento de panfletos no Ceará", descricao: "Integrantes da ABRANB distribuíram materiais informativos sobre saúde não-binária em postos de saúde." },
  { id: 4, foto: "/images/entregaPanfletos.jpg", titulo: "Compartilhamento de panfletos no Ceará", descricao: "Integrantes da ABRANB distribuíram materiais informativos sobre saúde não-binária em postos de saúde." },
];

export default function SlideShow({ notices = homeNotices, label = "Destaques" }: { notices?: SlideShowNotice[]; label?: string }) {
  const { activeIndex, slideRef, handleMouseDown, handleMouseMove, handleMouseUp, handleRadioChange } = useCarousel(notices.length);
  if (notices.length === 0) return null;

  return <div className="flex w-full min-w-0 flex-col items-center justify-center gap-7 sm:gap-10">
    <div ref={slideRef} aria-label={label} role="region" aria-roledescription="carrossel" className="mx-auto flex w-full max-w-[1600px] snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x select-none sm:gap-6 lg:gap-16" style={{ paddingInline: "max(1rem, calc((100% - 850px) / 2))" }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {notices.map((notice) => <BoxNoticesSlide notice={notice} key={notice.id} />)}
    </div>
    {notices.length > 1 && <div className="flex max-w-[92vw] flex-wrap items-center justify-center gap-2" role="group" aria-label={`${label}: escolher postagem`}>
      {notices.map((notice, index) => <input type="radio" name={`slide-${label}`} key={notice.id} checked={activeIndex === index} aria-label={`Mostrar ${notice.titulo}`} className={`h-5 w-5 cursor-pointer appearance-none rounded-full sm:h-6 sm:w-6 ${activeIndex === index ? "radio-slide-active" : "radio-slide"}`} onChange={() => handleRadioChange(index)} />)}
    </div>}
  </div>;
}
