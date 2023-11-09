export default class TagFormatter {
    constructor() {
        this.baseUrl = window.location.href
            .replace("Search", "TagFormat")
            .replace(/[^\/]+\/static.*$/, "human");
    }
    async toHumanFormat(tags) {
        const encodedTags = encodeURIComponent(JSON.stringify(tags));
        const url = `${this.baseUrl}?tags=${encodedTags}`;
        const response = await fetch(url);
        if (response.status > 399) {
            throw new FormatError(await response.text());
        }
        return await response.json();
    }
}
export class FormatError extends Error {
}
//# sourceMappingURL=Formatter.js.map