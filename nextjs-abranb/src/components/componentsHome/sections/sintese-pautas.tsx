import BtnLink from "@/components/btn-link";
import TitleUnderline from "@/components/title-underline";
import { useTranslation } from "react-i18next";

export default function SinteseDePautas() {
    const { t } = useTranslation("home");
    return (
        <div className="flex flex-col items-center justify-center max-w-full md:max-w-2/3 xl:max-w-1/2 mx-auto 
            text-lead leading-9 lg:leading-10 gap-2.5 px-4 pb-15 lg:pb-25 ">
            <TitleUnderline title={t("agendaSummary.title")} position="center" />

            <div>
                <p>{t("agendaSummary.description-1")}</p>
                <p className="my-3">{t("agendaSummary.description-2")}</p>
            </div>

            <div className="flex flex-col gap-2.5 lg:gap-6 leading-7">
                <span className="bg-linear">
                    {t("agendaSummary.topics.topic-1")}
                </span>
                <span className="bg-linear">
                    {t("agendaSummary.topics.topic-2")}
                </span>
                <span className="bg-linear">
                    {t("agendaSummary.topics.topic-3")}
                </span>
            </div>

            <div className="mt-10">
                <BtnLink
                    text={t("agendaSummary.button")}
                    variant="yellow/purple"
                    link="/"
                />
            </div>


        </div>
    )
}