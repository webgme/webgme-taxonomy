const { expect } = require('@playwright/test');

export default class RepoDevPage {
    private _page: any;

    constructor(page, route) {
        this._page = page;
    }

}