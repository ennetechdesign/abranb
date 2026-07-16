"use client"
import BoxNoticesSlide from "./box-notices-slide";
import { useCarousel } from "@/hooks/useCarousel";

const objNotices = [
  {
    id: 1,
    foto: "/images/encontroNbRJ.jpg",
    titulo: "Encontro de Não-Bináries do RJ",
    descricao:
      "Reunião presencial da ABRANB para organizar o encontro de pessoas não-binárias do Rio de Janeiro.",
  },
  {
    id: 2,
    foto: "/images/reuniaoABRANB.jpg",
    titulo: "Reunião com o Coletive Não-Binárie da Paraíba",
    descricao:
      "Discussão sobre acesso ao registro civil e outras demandas da população não-binária na Paraíba.",
  },
  {
    id: 3,
    foto: "/images/entregaPanfletos.jpg",
    titulo: "Compartilhamento de panfletos no Ceará",
    descricao:
      "Integrantes da ABRANB distribuíram materiais informativos sobre saúde não-binária em postos de saúde.",
  },
  {
    id: 4,
    foto: "/images/entregaPanfletos.jpg",
    titulo: "Compartilhamento de panfletos no Ceará",
    descricao:
      "Integrantes da ABRANB distribuíram materiais informativos sobre saúde não-binária em postos de saúde.",
  },
];

export default function SlideShow() {
  const {
    activeIndex, slideRef, handleMouseDown, handleMouseMove, handleMouseUp,
    handleRadioChange } = useCarousel(objNotices.length, 350);

  return (
    <div className="flex flex-col gap-10 justify-center items-center">

      <div className="flex lg:px-[25vw] overflow-x-hidden w-82.5 lg:w-[99vw] justify-start items-center gap-5 
        lg:gap-25 select-none max-lg:overflow-x-scroll"
        ref={slideRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>

        {objNotices.map((notice) => (
          <BoxNoticesSlide notice={notice} key={notice.id} />
        ))}

      </div>

      <div>
        {objNotices.map((_, index) => (
          <div key={index} className="inline-flex items-center">
            <label id="slide" className="inline-flex items-center"></label>
            <input type="radio" name="slide"
              checked={activeIndex === index}
              className={`appearance-none w-7 h-7 rounded-full mx-2.5 cursor-pointer
                 ${activeIndex === index ? 'bg-purple [html[data-color-scheme="night"]_&]:bg-gold [html[data-color-scheme="high-contrast"]_&]:bg-gold'
                  : 'bg-lilac [html[data-color-scheme="night"]_&]:bg-gold/50 [html[data-color-scheme="high-contrast"]_&]:bg-gold/50'}`}
              onChange={() => handleRadioChange(index)} />
          </div>
        ))}
      </div>
    </div>
  )
}