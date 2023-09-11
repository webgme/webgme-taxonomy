export default class TagFormatter {
  toGuidFormat(tags: any): any;
  toHumanFormat(tags: any): any;

  static from(core: GmeClasses.Core, node: Core.Node): Promise<TagFormatter>;
  static FormatError: typeof FormatError;
}

export class FormatError extends Error {
}
