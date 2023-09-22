/*
 * A stripped down version of FilterTag that contains the minimal required information
 * (assuming that the corresponding FilterTag can be found). Used for saving the current
 * tags in the URL.
 */
export default class LeanTag {
  id: string;
  value: any | null;

  constructor(id: string, value: any) {
    this.id = id;
    this.value = value;
  }
}
