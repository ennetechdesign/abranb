import SplitImageCtaSection from "../components/split-image-cta-section";

export default function ArquivosHistoricos() {
  return (
    <SplitImageCtaSection
      titleKey="historicalArchives.title"
      descriptionKey="historicalArchives.description"
      buttonTextKey="historicalArchives.button"
      buttonHref="/"
      buttonVariant="gold-to-purple"
      imageSide="right"
      image={{
        src: "/images/imagens-historicas.png",
        width: 480,
        height: 447,
        alt: "Ilustração de arquivos históricos",
        className: "w-79.5 h-75 lg:w-120 lg:h-112",
      }}
    />
  );
}
