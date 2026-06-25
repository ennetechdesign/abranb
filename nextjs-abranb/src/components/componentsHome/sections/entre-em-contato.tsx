import TitleUnderline from "@/components/title-underline";
import FormContato from "../form-contato";
import { useTranslation } from "react-i18next";
import BtnLink from "@/components/btn-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


const contactLinks = [
    {
        id: 'instagram',
        icon: faInstagram,
        text: '@abranb.articulacao',
        link: '',
    },
    {
        id: 'facebook',
        icon: faFacebook,
        text: 'Abranb - Articulação Brasileira Não-Binárie',
        link: '',
    },
    {
        id: 'email',
        icon: faEnvelope,
        text: 'abranb.associacao@gmail.com',
        link: '',
    },
];

export default function EntreEmContato() {
    const { t } = useTranslation("home");
    return (
        <div className="py-15 xl:py-25 px-6.5 xl:px-22.5 flex flex-col items-center">
            <div className="flex flex-col lg:w-2/5 items-center">
                <TitleUnderline title={t("contact.title")} position="center" />

                <p className="text-lead leading-8.75 lg:leading-10 mt-6 mb-15 mx-3">
                    {t("contact.description")}
                </p>
            </div>
            
            <FormContato />

            <div className="flex flex-col gap-7.5 max-w-full  mt-15">
                <div className="max-w-150 text-[28px]! xl:text-[32px]!">
                    <TitleUnderline title={t("contact.alternativeContactTitle")} position="center" />
                </div>

                <div className="flex flex-col gap-5 max-xl:items-center">
                    {contactLinks.map((item) => (
                        <BtnLink
                            key={item.id}
                            variant="yellow/purple"
                            link={item.link}
                            textSize="body"
                        >
                            <FontAwesomeIcon
                                icon={item.icon}
                                aria-hidden
                                className="size-3.5 shrink-0 mr-2"
                            />
                            <p>{item.text}</p>
                        </BtnLink>
                    ))}
                </div>

            </div>
        </div>
    )

}