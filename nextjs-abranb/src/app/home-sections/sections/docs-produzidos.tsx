import Button from "@/components/button";
import TitleUnderline from "@/components/title-underline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { faFileLines} from "@fortawesome/free-solid-svg-icons";
export default function DocsProduzidos() {
    const { t } = useTranslation("home");

    return (
        <div className="py-12.5 lg:py-17.5 px-5 sm:px-22.5 bg-purple [html[data-color-scheme='high-contrast']_&]:bg-purple/20">
            <div className="flex justify-center items-center gap-15 leading-10 text-paper flex-col-reverse lg:flex-row">
                <Image
                    width={400}
                    height={400}
                    src="/images/undraw_google-docs_fwhy.svg"
                    alt={t("")}
                    className="w-75 h-73.5 lg:w-91.5 lg:h-90" />

                <div className="lg:w-1/2">
                    <TitleUnderline title={t("documentsProduced.title")} position="start" color="gold" />

                    <p className="text-lead leading-8.75 lg:leading-10  text-paper mt-2.5">{t("documentsProduced.description")}</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-15 gap-5 md:gap-7.5">
                <div className="flex items-center justify-center gap-5 md:gap-7.5 max-lg:flex-col">
                    <Button
                        variant="outline-gold"
                        href="/"
                        textColor="paper"
                        textSize="body"
                        icon={<FontAwesomeIcon icon={faFileLines} aria-hidden />}
                    >
                        <p className="text-start">{t("documentsProduced.buttons.civilRegistry")}</p>
                    </Button>

                    <Button
                        variant="outline-gold"
                        href="/"
                        textColor="paper"
                        textSize="body"
                        icon={<FontAwesomeIcon icon={faFileLines} aria-hidden />}
                    >
                        {t("documentsProduced.buttons.annualReport")}
                    </Button>

                </div>
                <Button variant="solid-gold" href="/sobre/documentos">
                    {t("documentsProduced.buttons.moreDocuments")}
                </Button>
            </div>

        </div>
    )
}