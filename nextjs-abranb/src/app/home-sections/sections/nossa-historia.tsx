import CharcoalCtaSection from "../components/charcoal-cta-section";

export default function NossaHistoria() {
  return (
    <CharcoalCtaSection
      titleKey="ourHistory.title"
      descriptionKey="ourHistory.description"
      buttonTextKey="ourHistory.buttonText"
      buttonHref="/sobre/historia"
      buttonVariant="solid-purple"
      buttonTextColor="paper"
    />
  );
}
