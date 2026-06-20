export type FooterSocialLink = {
  id: "instagram" | "facebook" | "email";
  href: string;
  labelKey: string;
};

export type FooterProfessionalLink = {
  id: string;
  href: string;
  labelKey: string;
  noteKey?: string;
  icon: "clipboard" | "spreadsheet";
};

export type FooterResearchLink = {
  id: string;
  href: string;
  label: string;
};

export const footerSocialLinks: FooterSocialLink[] = [
  {
    id: "instagram",
    href: "https://www.instagram.com/abranb.articulacao",
    labelKey: "footer_social_instagram",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/abranb",
    labelKey: "footer_social_facebook",
  },
  {
    id: "email",
    href: "mailto:abranb.associacao@gmail.com",
    labelKey: "footer_social_email",
  },
];

export const footerProfessionalLinks: FooterProfessionalLink[] = [
  {
    id: "psychology",
    href: "#",
    labelKey: "footer_prof_psychology",
    noteKey: "footer_prof_psychology_note",
    icon: "clipboard",
  },
  {
    id: "psychiatry",
    href: "#",
    labelKey: "footer_prof_psychiatry",
    icon: "spreadsheet",
  },
  {
    id: "endocrinology",
    href: "#",
    labelKey: "footer_prof_endocrinology",
    icon: "spreadsheet",
  },
];

export const footerResearchLinks: FooterResearchLink[] = [
  { id: "orientando", href: "#", label: "Orientando" },
  { id: "blogue-alternative", href: "#", label: "Blogue Alternative" },
  { id: "abrai", href: "#", label: "Abrai" },
  {
    id: "multiplas-identidades",
    href: "#",
    label: "Múltiplas Identidades",
  },
];
