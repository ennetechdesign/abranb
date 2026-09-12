"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import BtnLink, { type BtnLinkProps } from "@/components/btn-link";
import TitleUnderline from "@/components/title-underline";

export default function SplitImageCtaSection({
  titleKey,
  descriptionKey,
  buttonTextKey,
  buttonHref,
  buttonVariant,
  buttonColorText,
  image,
  imageSide,
  bgClassName,
  paddingYXlClassName = "xl:py-25",
}: {
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
  buttonHref: string;
  buttonVariant: BtnLinkProps["variant"];
  buttonColorText?: string;
  image: { src: string; width: number; height: number; alt: string; className: string };
  imageSide: "left" | "right";
  bgClassName?: string;
  paddingYXlClassName?: string;
}) {
  const { t } = useTranslation("home");

  const content = (
    <div
      key="content"
      className={[
        "flex flex-col lg:w-2/5 gap-6 max-xl:mb-12.5 max-lg:items-center",
        imageSide === "left" ? "lg:ml-15" : "lg:mr-15",
      ].join(" ")}
    >
      <TitleUnderline title={t(titleKey)} position="start" />
      <p className="text-lead leading-8.75 lg:leading-10">{t(descriptionKey)}</p>
      <BtnLink
        text={t(buttonTextKey)}
        variant={buttonVariant}
        colorText={buttonColorText}
        link={buttonHref}
      />
    </div>
  );

  const imageEl = (
    <Image
      key="image"
      width={image.width}
      height={image.height}
      src={image.src}
      alt={image.alt}
      className={image.className}
    />
  );

  return (
    <section
      className={[
        "py-12.5 px-6.5 xl:px-22.5 flex justify-between items-center lg:justify-evenly",
        paddingYXlClassName,
        imageSide === "left" ? "flex-col-reverse lg:flex-row" : "flex-col lg:flex-row",
        bgClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {imageSide === "left" ? [imageEl, content] : [content, imageEl]}
    </section>
  );
}
