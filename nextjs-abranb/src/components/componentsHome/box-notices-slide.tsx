import Image from "next/image";

type BoxNoticesSlideProps = {
    id: number;
    foto: string,
    titulo: string
    descricao: string
}

export default function BoxNoticesSlide({ notice }: { notice: BoxNoticesSlideProps }) {

    return (
        <div className="cursor-grabbing bg-lilac rounded-[40px]">
            <div className="flex flex-col lg:flex-row text-ink hover:bg-purple hover:text-white transition-colors 
                duration-300 rounded-[40px] box-slide">
                <picture className="w-full h-50 lg:min-w-97.5 lg:h-67.5 object-cover rounded-[40px] overflow-hidden">
                    <Image src={notice.foto} width={300} height={300} draggable={false} alt=""
                        className="w-full h-full object-cover rounded-[40px] transition-transform duration-500
                        hover:scale-110" />
                </picture>
                <div className="px-5 lg:px-5 py-5 lg:min-w-110">
                    <h3 className="text-title font-bold hyphens-auto mb-2">{notice.titulo}</h3>
                    <p className="text-lead/relaxed line-clamp-3">{notice.descricao}</p>
                </div>
            </div>
        </div>
    )
}