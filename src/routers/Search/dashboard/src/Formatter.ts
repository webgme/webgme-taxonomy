export default class TagFormatter {
  baseUrl: string;

  constructor() {
    this.baseUrl = window.location.href
      .replace("Search", "TagFormat")
      .replace(/[^\/]+\/static.*$/, "human");
  }

  async toHumanFormat(tags: any[]) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tags),
    };
    const response = await fetch(this.baseUrl, options);
    if (response.status > 399) {
      throw new FormatError(await response.text());
    }
    return await response.json();
  }
}

export class FormatError extends Error {
}
