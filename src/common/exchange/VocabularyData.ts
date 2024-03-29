// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ReleaseState } from "./ReleaseState";
import type { Term } from "./Term";
import type { TermName } from "./TermName";
import type { VocabularyId } from "./VocabularyId";

export interface VocabularyData {
  id: VocabularyId;
  description?: string;
  releaseState?: ReleaseState;
  terms: Record<TermName, Term>;
}
