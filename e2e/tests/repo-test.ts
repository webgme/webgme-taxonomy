import test from '@playwright/test'
import { RepoImpl } from "../common/fixtures/RepoImpl"

type repoFixture = {
    repoData: RepoImpl
}

export const repoTest = test.extend<repoFixture>({
    repoData: async ({ }, use) => {
        await use(new RepoImpl("/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/"))
    }
});