"use client"
import Image from "next/image";
import TitleUnderline from "@/components/title-underline";
import { useTranslation } from "react-i18next";
import BtnLink from "@/components/btn-link";

export default function EntendaNB() {
    const { t } = useTranslation("home");

    return (
        <div className="flex flex-col lg:flex-row py-12.5 lg:py-25 px-6.5 md:px-10 xl:px-20 items-center md:justify-between 
            2xl:justify-evenly">
            <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 lg:mr-15">

                <TitleUnderline title={t("understandNonBinarity.title")} position="start" />
                <p className="text-lead/loose hyphens-auto my-6 w-full xl:w-3/4">
                    {t("understandNonBinarity.nonBinaryDefinitionText")}
                </p>
                    
                <BtnLink 
                    text={t("understandNonBinarity.glossaryButton")}
                    variant="yellow/purple"
                    link="/glossario"
                />
            </div>

            <Image
                width={400}
                height={356}
                src="/images/img-coracao-nb.png"
                alt={t("understandNonBinarity.imageAlt")}
                className="max-w-80 max-min-h-71 lg:max-w-100 lg:max-h-89 lg:min-w-100 lg:min-h-89 mt-10 lg:mt-0" />
        </div>
    )
}
