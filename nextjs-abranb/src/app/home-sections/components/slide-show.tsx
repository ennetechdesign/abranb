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
};

const homeNotices: SlideShowNotice[] = [
  { id: 1, foto: "/images/encontroNbRJ.jpg", titulo: "Encontro de Não-Bináries do RJ", descricao: "Reunião presencial da ABRANB para organizar o encontro de pessoas não-binárias do Rio de Janeiro." },
  { id: 2, foto: "/images/reuniaoABRANB.jpg", titulo: "Reunião com o Coletive Não-Binárie da Paraíba", descricao: "Discussão sobre acesso ao registro civil e outras demandas da população não-binária na Paraíba." },
  { id: 3, foto: "/images/entregaPanfletos.jpg", titulo: "Compartilhamento de panfletos no Ceará", descricao: "Integrantes da ABRANB distribuíram materiais informativos sobre saúde não-binária em postos de saúde." },
  { id: 4, foto: "/images/entregaPanfletos.jpg", titulo: "Compartilhamento de panfletos no Ceará", descricao: "Integrantes da ABRANB distribuíram materiais informativos sobre saúde não-binária em postos de saúde." },
];

export default function SlideShow({ notices = homeNotices, label = "Destaques" }: { notices?: SlideShowNotice[]; label?: string }) {
  const { activeIndex, slideRef, handleMouseDown, handleMouseMove, handleMouseUp, handleRadioChange } = useCarousel(notices.length, 350);
  if (notices.length === 0) return null;

  return <div className="flex flex-col items-center justify-center gap-8 sm:gap-12">
    <div ref={slideRef} aria-label={label} role="region" aria-roledescription="carrossel" className="flex w-[88vw] select-none items-center justify-start gap-5 overflow-x-hidden max-lg:overflow-x-scroll lg:w-[99vw] lg:gap-25 lg:px-[25vw]" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {notices.map((notice) => <BoxNoticesSlide notice={notice} key={notice.id} />)}
    </div>
    {notices.length > 1 && <div className="flex items-center justify-center" role="group" aria-label={`${label}: escolher postagem`}>
      {notices.map((notice, index) => <input type="radio" name={`slide-${label}`} key={notice.id} checked={activeIndex === index} aria-label={`Mostrar ${notice.titulo}`} className={`mx-2.5 h-6 w-6 cursor-pointer appearance-none rounded-full ${activeIndex === index ? "bg-purple" : "bg-lilac"}`} onChange={() => handleRadioChange(index)} />)}
    </div>}
  </div>;
}
