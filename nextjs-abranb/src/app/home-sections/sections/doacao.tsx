"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TitleUnderline from "@/components/title-underline";
import Button from "@/components/button";
import PixLogo from "@/components/pix-logo";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const STATUS_RESET_MS = 4000;

export default function Doacao() {
    const { t } = useTranslation(["home", "common"]);
    const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
        "idle",
    );
    const resetTimerRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current !== null) {
                window.clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    async function handleCopyPixKey() {
        const pixKey = t("donation.pixButton");
        const copied = await copyToClipboard(pixKey);
        setCopyStatus(copied ? "copied" : "failed");

        if (resetTimerRef.current !== null) {
            window.clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = window.setTimeout(() => {
            resetTimerRef.current = null;
            setCopyStatus("idle");
        }, STATUS_RESET_MS);
    }

    const statusMessage =
        copyStatus === "copied"
            ? t("donation.pixCopied")
            : copyStatus === "failed"
              ? t("donation.pixCopyFailed")
              : "";

    return (
        <section className="h-full py-12.5 lg:py-25 px-6 flex flex-col items-center justify-center gap-15">
            <div className="flex flex-col items-center gap-3.5">
                <TitleUnderline title={t("donation.title")} position="center" />
                <p className="max-w-180 text-lead">{t("donation.description")}</p>
            </div>

            <div className="flex items-center gap-7.5 max-lg:flex-col">
                <div className="w-55 h-55 max-lg:w-62.5 max-lg:h-62">
                    <PixLogo />
                </div>

                <div>
                    <p className="text-lead mb-3 max-lg:text-center">{t("donation.pixLabel")}</p>
                    <div className="flex flex-col max-lg:items-center items-start gap-5">
                      <div className="flex flex-col max-lg:items-center items-start">
                        <Button
                          variant="gold-to-purple"
                          icon={<FontAwesomeIcon icon={faCopy} size="lg" />}
                          onClick={handleCopyPixKey}
                          aria-label={t("donation.pixCopyAria")}
                        >
                          <span className="wrap-anywhere">{t("donation.pixButton")}</span>
                        </Button>
                        <p
                          className="text-body mt-1 min-h-[1.45em] max-lg:text-center"
                          role="status"
                          aria-live="polite"
                        >
                          {statusMessage}
                        </p>
                      </div>
                  </div>
                </div>
            </div>
        </section>
    );
}
