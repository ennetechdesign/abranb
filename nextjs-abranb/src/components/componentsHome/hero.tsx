"use client"
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation("home")

    return (
        <>
            <section className="bg-background-hero w-full h-full lg:h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] flex flex-col-reverse xl:flex-row 
                       justify-start xl:justify-center items-center px-3 md:px-10 pt-5 xl:pt-0 gap-12">
                <picture className="md:mr-10 xl:h-full flex justify-end items-end">
                  <Image
                    src="/images/hero3.png"
                    alt="Hero Image"
                    width={800}
                    height={800}
                    priority
                    className="object-contain max-xl:w-140" 
                    />  
                </picture>
                

                <div className=" text-heading-h1 font-normal text-center flex justify-center">
                    <h1 className="text-foreground xl:max-w-166">
                        {t("title-h1-1")}< br />
                        <span className="bg-purple-yellow font-bold rounded-[100px] hyphens-auto px-5 md:px-10 py-1.5 text-background leading-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                            {t("title-h1-2")}
                        </span>
                    </h1>
                </div>

            </section>
        </>
    );
}
