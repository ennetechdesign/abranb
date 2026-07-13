import TitleUnderline from "@/components/title-underline";
import SlideShow from "../slide-show";
import { useTranslation } from "react-i18next";
import BtnLink from "@/components/btn-link";

export default function OQueFizemos() {
    const { t } = useTranslation("home");

    return (
        <div className="px-6.5 flex flex-col justify-center items-center bg-lilac/10 py-12.5 lg:py-25">
            <TitleUnderline title={t("whatWeDid.title")} position="center" />

            <div className="mt-15 mb-12.5">
                <SlideShow />
            </div>

            <BtnLink
                text={t("whatWeDid.buttonText")}
                variant="yellow/purple"
                link="/"
            />
        </div>
    )
}