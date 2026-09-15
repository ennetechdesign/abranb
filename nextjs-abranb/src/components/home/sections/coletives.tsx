"use client"
import Image from "next/image";
import TitleUnderline from "@/components/title-underline";
import { useTranslation } from "react-i18next";
import BtnLink from "@/components/btn-link";

const coletives = [
    {
        img: "/images/coletives/anb-amazonas.jpg",
        instituicao: "Associação de Não-Bináries do Amazonas",
        link: "https://www.instagram.com/anb.amazonas"
    },
    {
        img: "/images/coletives/coletive-nb-pb.png",
        instituicao: "Coletive Não-Binárie da Paraíba",
        link: "https://coletivenaobinariepb.com.br/"
    },
    {
        img: "/images/coletives/coletive-nbpe.jpg",
        instituicao: "Coletiva de Pessoas Não-Binárias de Pernambuco",
        link: "https://linktr.ee/coletivamadamesata"
    },
    {
        img: "/images/coletives/coletives-nb.png",
        instituicao: "ColetivES Não-Binárie",
        link: "https://www.instagram.com/nb.coletives"
    },
    {
        img: "/images/coletives/anb-amazonas.jpg",
        instituicao: "Associação de Não-Bináries de Minas Gerais",
        link: "https://www.instagram.com/coletivo.nbmg"
    },
    {
        img: "/images/coletives/coletivo-nbmg.jpg",
        instituicao: "Coletive Não-Binárie do Rio de Janeiro",
        link: "https://linktr.ee/conb.rj"
    }
]

export default function Coletives() {
    const { t } = useTranslation("home");

    return (
        <div className="py-12.5 lg:py-25 px-2.5 lg:px-12.5 flex flex-col justify-center items-center gap-12.5 lg:gap-15">

            <TitleUnderline title={t("partnershipCollectives.title")} position="center" />

            <ul className="flex flex-col lg:flex-row lg:flex-wrap gap-7.5 lg:gap-12.5 justify-center items-center">
                {coletives.map((coletive, i) => (
                    <li key={i} className="rounded-[100px] pr-7.5 lg:pr-12.5 bg-lilac hover:bg-purple text-charcoal 
                        hover:text-paper max-w-86 lg:max-w-90 shadow-lg/10 text-body">
                        <a href={coletive.link} target="_blank" rel="noopener noreferrer"
                            className="flex justify-start items-center">
                            <picture className="mr-3 lg:mr-4">
                                <Image
                                    width={120}
                                    height={120}
                                    src={coletive.img}
                                    alt={`Logo ${coletive.instituicao}`}
                                    className="w-20 h-20 min-w-20 lg:min-w-30 lg:w-30 lg:h-30 object-cover rounded-full" />
                            </picture>
                            <p className="leading-tight text-center">{coletive.instituicao}</p>

                        </a>
                    </li>
                ))}
            </ul>

            <BtnLink
                text={t("partnershipCollectives.buttonText")}
                variant="yellow/purple"
                link="/"
            />
        </div>
    )
}
