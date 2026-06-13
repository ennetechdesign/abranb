"use client";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type BtnLinkProps = {
    text?: string;
    variant: "yellow/purple" | "purple/yellow" | "purple" | "yellow" | "opacity/yellow";
    link: string;
    colorText?: string,
    textSize?: string,
    children?: React.ReactNode | null,
    target?: string
}

function variantsBtnsStyles(variant: "yellow/purple" | "purple/yellow" | "purple" | "yellow" | "opacity/yellow") {
    if (variant === "yellow/purple") {
        return `
            bg-gold/50 border hover:bg-gold border-1 border-gold 
            [html[data-color-scheme='night']_&]:bg-purple/50 [html[data-color-scheme='night']_&]:hover:bg-purple
            [html[data-color-scheme='night']_&]:border-purple [html[data-color-scheme='night']_&]:text-paper 
            [html[data-color-scheme='high-contrast']_&]:bg-purple/50 [html[data-color-scheme='high-contrast']_&]:border-purple 
            [html[data-color-scheme='high-contrast']_&]:hover:bg-purple [html[data-color-scheme='high-contrast']_&]:text-paper
        `
    } else if (variant === "purple/yellow") {
        return `
            bg-purple/50 border hover:bg-purple border-1 border-purple
            [html[data-color-scheme='night']_&]:bg-gold/50 [html[data-color-scheme='night']_&]:hover:bg-gold
            [html[data-color-scheme='night']_&]:border-gold 
            [html[data-color-scheme='high-contrast']_&]:bg-gold/50 [html[data-color-scheme='high-contrast']_&]:border-gold 
            [html[data-color-scheme='high-contrast']_&]:hover:bg-gold
        `
    } else if(variant === "purple") {
       return `bg-purple/50 border-1 border-purple hover:bg-purple`
    } else if(variant === "yellow") {
       return `bg-gold/70 hover:brightness-115`
    } else if(variant === "opacity/yellow") {
       return `bg-gold/20 hover:brightness-115 border-1 border-gold`
    }
}

export default function BtnLink({ 
    text, 
    variant= "yellow/purple", 
    link, colorText = "deep", 
    textSize = "lead",
    children = null,
    target = "_self"
}: BtnLinkProps) {

    return (
        <Link href={link} target={target}  rel="noopener noreferrer">
            <button className={`py-2.5 px-5 md:py-4 md:px-7 inline-flex items-center font-bold justify-center  
                     rounded-4xl text-${textSize} text-${colorText} cursor-pointer ${variantsBtnsStyles(variant)}`}>
                {children ? 
                    children : <> 
                        {text}
                        <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                    </>
                }
                
            </button>
        </Link>
    )
}