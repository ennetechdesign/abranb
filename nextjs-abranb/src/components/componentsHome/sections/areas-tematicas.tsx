import BtnLink from "@/components/btn-link";
import TitleUnderline from "@/components/title-underline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AreasTematicas() {
    const { t } = useTranslation("home");

    return (
        <section className="py-12.5 xl:py-17.5 px-6.5 xl:px-22.5 flex flex-col-reverse lg:flex-row justify-between items-center lg:justify-evenly bg-gold
            [html[data-color-scheme='night']_&]:bg-gold/40 [html[data-color-scheme='high-contrast']_&]:bg-gold/40">
            <Image
                width={450}
                height={288}
                src="/images/blog.svg"
                alt="Ilustração de arquivos históricos"
                className="w-79.5 h-75 lg:w-112.5 lg:h-72" />

            <div className="flex flex-col lg:w-2/5 gap-6 max-xl:mb-12.5  lg:ml-15 max-lg:items-center">
                <TitleUnderline title={t("thematicAreas.title")} position="start" />

                <p className="text-lead leading-8.75 lg:leading-10">
                    {t("thematicAreas.description")}
                </p>
                <BtnLink
                    text={t("thematicAreas.button")}
                    variant="purple/yellow"
                    colorText="paper-deep"
                    link="/"
                />
            </div>
        </section>
    )
};