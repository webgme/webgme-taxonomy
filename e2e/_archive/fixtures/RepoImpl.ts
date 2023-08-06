export interface IRepo {
    _repoRoute: string;
}

export default class RepoImpl implements IRepo {
    static _repoName: string = "NewExample-" + Date.now();
    _repoRoute: string;

    constructor(repoRoute: string) {
        this._repoRoute = repoRoute;
    }

    async getRepoName(): Promise<string> {
        return RepoImpl._repoName;
    }

    async getRepoRoute(): Promise<string> {
        return this._repoRoute
    }
}