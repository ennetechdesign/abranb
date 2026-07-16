import BtnLink from "@/components/btn-link";
import TitleUnderline from "@/components/title-underline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ArquivosHistoricos() {
    const { t } = useTranslation("home");

    return (
        <section className="py-12.5 xl:py-25 px-6.5 xl:px-22.5 flex flex-col lg:flex-row justify-between items-center lg:justify-evenly">
            <div className="flex flex-col items-start lg:w-2/5 gap-6 max-xl:mb-12.5  lg:mr-15 max-lg:items-center">
                <TitleUnderline title={t("historicalArchives.title")} position="start" />

                <p className="text-lead leading-8.75 lg:leading-10">
                    {t("historicalArchives.description")}
                </p>
                <BtnLink
                    text={t("historicalArchives.button")}
                    variant="yellow/purple"
                    link="/"
                />
            </div>

            <Image
                width={480}
                height={447}
                src="/images/imagens-historicas.png"
                alt="Ilustração de arquivos históricos"
                className="w-79.5 h-75 lg:w-120 lg:h-112" />
        </section>
    )
};