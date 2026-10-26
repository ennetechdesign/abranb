/** Yellow-and-black notice pinned above the header on every page (it sticks together with the header). */
export function ConstructionBanner({ message }: { message: string }) {
  return (
    <div className="construction-banner" role="note">
      <span aria-hidden className="construction-banner-icon">
        ⚠
      </span>
      <p>{message}</p>
    </div>
  );
}
