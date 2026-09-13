import SplitImageCtaSection from "../components/split-image-cta-section";

export default function AreasTematicas() {
  return (
    <SplitImageCtaSection
      titleKey="thematicAreas.title"
      descriptionKey="thematicAreas.description"
      buttonTextKey="thematicAreas.button"
      buttonHref="/"
      buttonVariant="purple-to-gold"
      buttonTextColor="paper-deep"
      imageSide="left"
      paddingYXlClassName="xl:py-17.5"
      bgClassName="bg-gold [html[data-color-scheme='night']_&]:bg-gold/40 [html[data-color-scheme='high-contrast']_&]:bg-gold/40"
      image={{
        src: "/images/blog.svg",
        width: 450,
        height: 288,
        alt: "Ilustração de arquivos históricos",
        className: "w-79.5 h-75 lg:w-112.5 lg:h-72",
      }}
    />
  );
}
