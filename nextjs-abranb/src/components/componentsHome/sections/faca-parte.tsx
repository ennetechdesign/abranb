import { useTranslation } from "react-i18next";
import TitleUnderline from "../../title-underline";
import { Trans } from "react-i18next";
import BackgroundFixed from "../background-fixed";
import BtnLink from "@/components/btn-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";


export default function FacaParte() {
    const { t } = useTranslation("home");
    return (
        <section>
            <BackgroundFixed>
                <div className="h-full  py-12.5 lg:py-25 px-6 bg-charcoal/90 flex flex-col items-center justify-center gap-7.5">
                    <TitleUnderline title={t("joinOurUnion.title")} position="center" color="gold" />
                    <p className="text-lead/relaxed lg:w-1/2 text-paper">
                        <Trans
                            t={t}
                            i18nKey="joinOurUnion.description"
                            components={{
                                highlight: <span className="text-gold font-bold" />
                            }}
                        />
                    </p>
                    <div className="flex flex-col items-center gap-5">
                        <BtnLink variant="purple" colorText="paper" target="_blank" link="https://docs.google.com/forms/d/e/1FAIpQLSdGmXRGOZgk8iRZABKhVHW1ErioY1INCkIdVTsFZ0d9UFKWmQ/viewform">
                            <FontAwesomeIcon icon={faWpforms} size="lg" style={{ marginRight: '0.6rem' }} />
                            {t("joinOurUnion.button")}
                        </BtnLink >

                        <p className="text-paper">{t("joinOurUnion.timeEstimate")}</p>
                    </div>

                </div>
            </BackgroundFixed>
        </section>
    )
}