import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CharcoalCtaSection from "../charcoal-cta-section";

export default function FacaParte() {
  return (
    <CharcoalCtaSection
      titleKey="joinOurUnion.title"
      descriptionKey="joinOurUnion.description"
      buttonTextKey="joinOurUnion.button"
      buttonHref="https://docs.google.com/forms/d/e/1FAIpQLSdGmXRGOZgk8iRZABKhVHW1ErioY1INCkIdVTsFZ0d9UFKWmQ/viewform"
      buttonVariant="purple"
      buttonColorText="paper"
      buttonTarget="_blank"
      timeEstimateKey="joinOurUnion.timeEstimate"
      icon={
        <FontAwesomeIcon icon={faWpforms} size="lg" style={{ marginRight: "0.6rem" }} />
      }
    />
  );
}
