import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const { projectId, dataset } = client.config();
const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}

/** Builds an image URL only when Sanity returned a real asset reference. */
export function getImageUrl(source: unknown, width: number, height: number) {
  if (!builder || !source || typeof source !== "object" || !("asset" in source)) return null;
  const asset = source.asset;
  if (!asset || typeof asset !== "object" || !("_ref" in asset) || typeof asset._ref !== "string") return null;
  return builder.image(source as SanityImageSource).width(width).height(height).format("webp").url();
}
