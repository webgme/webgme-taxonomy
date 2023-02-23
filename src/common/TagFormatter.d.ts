export default interface TagFormatter {
  toGuidFormat(tags: any[]): any[];
  toHumanFormat(tags: any[]): any[];
}

export class FormatError extends Error {
}
