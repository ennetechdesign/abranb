"use client"
import Image from "next/image";
import TitleUnderline from "@/components/title-underline";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/button";

export default function EntendaNB() {
    const { t } = useTranslation("home");

    return (
        <div className="flex flex-col lg:flex-row py-25 px-5 md:px-10 xl:px-20 max-lg:items-center md:justify-between 2xl:justify-evenly">
            <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 lg:mr-15">

                <TitleUnderline title={t("understandNonBinarity.title")} position="start" />
                <p className="text-lead/loose hyphens-auto my-6 w-full xl:w-3/4">
                    {t("understandNonBinarity.nonBinaryDefinitionText")}
                </p>
                <Button href="/glossario" variant="primary" size="medium">
                    {t("understandNonBinarity.glossaryButton")}
                </Button>
            </div>

            <Image
                width={400}
                height={300}
                src="/images/img-coracao-nb.png"
                alt={t("understandNonBinarity.imageAlt")}
                className="max-w-80 max-min-h-71 lg:max-w-full lg:max-h-full my-5" />
        </div>
    )
}
