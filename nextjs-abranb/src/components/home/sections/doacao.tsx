import Image from "next/image";
import { useTranslation } from "react-i18next";
import TitleUnderline from "../../title-underline";
import Button from "@/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

export default function Doacao() {
    const { t } = useTranslation("home");

    return (
        <section className="h-full py-12.5 lg:py-25 px-6 flex flex-col items-center justify-center gap-15">
            <div className="flex flex-col items-center gap-3.5">
                <TitleUnderline title={t("donation.title")} position="center" />
                <p className="max-w-180 text-lead">{t("donation.description")}</p>
            </div>

            <div className="flex items-center gap-7.5 max-lg:flex-col">
                <div>
                    <Image
                        width={250}
                        height={248}
                        src="/images/code-doe.png"
                        alt="QR-code"
                        className="w-62.5 h-62 rounded-[20px]" />
                </div>

                <div>
                    <p className="text-lead mb-3 max-lg:text-center">{t("donation.pixLabel")}</p>
                    <div className="flex flex-col max-lg:items-center items-start gap-5">
                      <Button
                        variant="gold-to-purple"
                        href="/"
                        icon={<FontAwesomeIcon icon={faCopy} size="lg" />}
                      >
                        <p className="wrap-anywhere">{t("donation.pixButton")}</p>
                      </Button>

                    <Button
                        variant="outline-gold-to-purple"
                        href="/"
                        icon={<FontAwesomeIcon icon={faPaypal} size="lg" />}
                    >
                        <p className="wrap-anywhere">{t("donation.paypalButton")}</p>
                    </Button>
                    </div>
                    
                </div>

            </div>

        </section>
    );
}