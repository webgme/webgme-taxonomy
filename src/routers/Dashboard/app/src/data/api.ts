type ContentType = Readonly<{
  name: string;
  path: string;
  url: string;
}>;

type Project = Readonly<{
  name: string;
  contentTypes: readonly ContentType[];
}>;

export default class API {
  apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  getProjectInfo = async () => {
    const url = this.apiBaseUrl + "/info";
    const response = await fetch(url);
    return response.json() as Promise<Project>;
  };

  getDashboardUrlFromUri = async (uri: string) => {
    const postUrl = this.apiBaseUrl + "/resolve-url";
    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uri }),
    });

    return await response.json() as { url: string; host: string };
  };
}
