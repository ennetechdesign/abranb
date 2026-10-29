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
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdAm_2gVE3zhU_Y6YC7zdiM6icrgroY6cDWYJyjRJ0KdCfdiw/viewform",
    labelKey: "footer_prof_psychology",
    noteKey: "footer_prof_psychology_note",
    icon: "clipboard",
  },
  {
    id: "psychiatry",
    href: "https://docs.google.com/spreadsheets/d/1tiSYgEletUXm2qx3UGQ0ZI1FDPsb_UfLGjl1wasowLU/edit?gid=0#gid=0",
    labelKey: "footer_prof_psychiatry",
    icon: "spreadsheet",
  },
  {
    id: "endocrinology",
    href: "https://docs.google.com/spreadsheets/d/1SQ9KHPhth7HUtFf7L9EOGF3KAYt8sblTBRC2ukDIpuc/edit?gid=0#gid=0",
    labelKey: "footer_prof_endocrinology",
    icon: "spreadsheet",
  },
];

export const footerResearchLinks: FooterResearchLink[] = [
  { id: "orientando", href: "https://orientando.org/", label: "Orientando" },
  { id: "blogue-alternative", href: "https://bloguealternative.wordpress.com/", label: "Blogue Alternative" },
  { id: "abrai", href: "https://abrai.org.br/", label: "Abrai" },
  {
    id: "multiplas-identidades",
    href: "https://multiplasidentidades.nekoweb.org/",
    label: "Múltiplas Identidades",
  },
];
