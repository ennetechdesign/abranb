import { useTranslation } from "react-i18next";
import TitleUnderline from "../../title-underline";
import { Trans } from "react-i18next";
import BackgroundFixed from "../background-fixed";
import BtnLink from "@/components/btn-link";

export default function NossaHistoria() {
    const { t } = useTranslation("home");

    return (
        <BackgroundFixed>
            <div className="h-full  py-12.5 lg:py-25 px-5 bg-charcoal/90 flex flex-col items-center justify-center gap-7.5">
                <TitleUnderline title={t("ourHistory.title")} position="center" color="gold" />
                <p className="text-lead/relaxed lg:w-1/2 text-paper">
                    <Trans
                        t={t}
                        i18nKey="ourHistory.description"
                        components={{
                            highlight: <span className="text-gold font-bold" />
                        }}
                    />
                </p>
                <BtnLink
                    text={t("ourHistory.buttonText")}
                    variant="purple"
                    link="/"
                />
            </div>
        </BackgroundFixed>

    )
}