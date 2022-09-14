export default class TagFormatter {
  baseUrl: string;

  constructor() {
    this.baseUrl = window.location.href
      .replace("Search", "TagFormat")
      .replace(/static.*$/, "human");
  }

  async toHumanFormat(tags: any[]) {
    const encodedTags = encodeURIComponent(JSON.stringify(tags));
    const url = `${this.baseUrl}?tags=${encodedTags}`;
    const response = await fetch(url);
    return await response.json();
  }
}
