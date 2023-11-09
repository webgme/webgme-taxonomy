import { deepMerge } from "../../Utils";
import { ArtifactMetadata, ArtifactMetadatav2 } from "./types";

export function toArtifactMetadatav2(
  metadata: ArtifactMetadata,
): ArtifactMetadatav2 {
  let tags;
  if ("tags" in metadata) { // updated metadata
    tags = metadata.tags;
  } else {
    // Update the old format to the new one
    const taxonomyTags = metadata.taxonomyTags || [];
    tags = deepMerge(...taxonomyTags);
  }

  return {
    tags,
    displayName: metadata.displayName,
    taxonomyVersion: metadata.taxonomyVersion,
    time: metadata.time,
  };
}
