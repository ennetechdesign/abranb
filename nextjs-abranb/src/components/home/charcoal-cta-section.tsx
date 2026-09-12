"use client";

import type { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";

import BtnLink, { type BtnLinkProps } from "@/components/btn-link";
import TitleUnderline from "@/components/title-underline";
import BackgroundFixed from "./background-fixed";

export default function CharcoalCtaSection({
  titleKey,
  descriptionKey,
  buttonTextKey,
  buttonHref,
  buttonVariant,
  buttonColorText = "paper",
  buttonTarget,
  icon,
  timeEstimateKey,
}: {
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
  buttonHref: string;
  buttonVariant: BtnLinkProps["variant"];
  buttonColorText?: string;
  buttonTarget?: string;
  icon?: ReactNode;
  timeEstimateKey?: string;
}) {
  const { t } = useTranslation("home");

  return (
    <section>
      <BackgroundFixed>
        <div className="h-full py-12.5 lg:py-25 px-6 bg-charcoal/90 flex flex-col items-center justify-center gap-7.5">
          <TitleUnderline title={t(titleKey)} position="center" color="gold" />
          <p className="text-lead/relaxed lg:w-1/2 text-paper">
            <Trans
              t={t}
              i18nKey={descriptionKey}
              components={{
                highlight: <span className="text-gold font-bold" />,
              }}
            />
          </p>
          <div className="flex flex-col items-center gap-5">
            {icon ? (
              <BtnLink
                variant={buttonVariant}
                colorText={buttonColorText}
                target={buttonTarget}
                link={buttonHref}
              >
                {icon}
                {t(buttonTextKey)}
              </BtnLink>
            ) : (
              <BtnLink
                text={t(buttonTextKey)}
                variant={buttonVariant}
                colorText={buttonColorText}
                target={buttonTarget}
                link={buttonHref}
              />
            )}
            {timeEstimateKey ? <p className="text-paper">{t(timeEstimateKey)}</p> : null}
          </div>
        </div>
      </BackgroundFixed>
    </section>
  );
}
