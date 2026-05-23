"use client";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type BtnLinkProps = {
    text: string;
    variant: "yellow/purple" | "purple";
    link: string;
}

function variantsBtnsStyles(variant: "yellow/purple" | "purple") {
    if (variant === "yellow/purple") {
        return `
            bg-gold/50 border hover:bg-gold border-1 border-gold [html[data-color-scheme='night']_&]:bg-purple/50 [html[data-color-scheme='night']_&]:hover:bg-purple
            [html[data-color-scheme='night']_&]:border-purple [html[data-color-scheme='high-contrast']_&]:bg-purple/50   
            [html[data-color-scheme='high-contrast']_&]:border-purple [html[data-color-scheme='high-contrast']_&]:hover:bg-purple
        `
    } else if(variant === "purple") {
       return `bg-purple/50 border-1 border-purple hover:bg-purple text-paper`
    }
}

export default function BtnLink({ text, variant= "yellow/purple", link}: BtnLinkProps) {

    return (
        <Link href={link}>
            <button className={`py-2.5 px-5 md:py-4 md:px-7 inline-flex text-nowrap items-center font-bold justify-center  
                     rounded-4xl text-lead cursor-pointer ${variantsBtnsStyles(variant)}`}>
                {text}
                <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
            </button>
        </Link>
    )
}