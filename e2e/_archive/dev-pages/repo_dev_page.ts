const { expect } = require('@playwright/test');

/**
 * Class meant to wrap access to a page, meant to start as a page reference
 * for repo page.  No immediate value.
 */
export default class RepoDevPage {
    private _page: any;

    constructor(page, route) {
        this._page = page;
    }

}