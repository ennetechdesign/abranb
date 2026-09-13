"use client";

import type { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";

import Button, { type ButtonProps } from "@/components/button";
import TitleUnderline from "@/components/title-underline";
import BackgroundFixed from "./background-fixed";

export default function CharcoalCtaSection({
  titleKey,
  descriptionKey,
  buttonTextKey,
  buttonHref,
  buttonVariant,
  buttonTextColor = "paper",
  buttonTarget,
  icon,
  timeEstimateKey,
}: {
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
  buttonHref: string;
  buttonVariant: ButtonProps["variant"];
  buttonTextColor?: ButtonProps["textColor"];
  buttonTarget?: ButtonProps["target"];
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
            <Button
              variant={buttonVariant}
              textColor={buttonTextColor}
              target={buttonTarget}
              href={buttonHref}
              icon={icon}
            >
              {t(buttonTextKey)}
            </Button>
            {timeEstimateKey ? <p className="text-paper">{t(timeEstimateKey)}</p> : null}
          </div>
        </div>
      </BackgroundFixed>
    </section>
  );
}
