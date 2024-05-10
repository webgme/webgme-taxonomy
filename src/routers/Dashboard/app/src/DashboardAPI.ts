type ContentType = Readonly<{
  name: string;
  path: string;
  url: string;
}>;

type Project = Readonly<{
  name: string;
  contentTypes: readonly ContentType[];
}>;

export interface PackageJSON {
  name: string;
  version: string;
}

export class StatusError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default class DashboardAPI {
  apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  private async handleResponse<T>(response: Response) {
    if (!response.ok) {
      throw new StatusError(
        `${response.status} - ${response.statusText}`,
        response.status,
      );
    }

    return response.json() as Promise<T>;
  }

  async getProjectInfo() {
    const url = this.apiBaseUrl + "/info";
    return this.handleResponse<Project>(await fetch(url));

  };

  async getPackageJSON() {
    const url = this.apiBaseUrl + "/package-json";
    return this.handleResponse<PackageJSON>(await fetch(url));
  };

  async getDashboardUrlFromUri(uri: string) {
    if (!uri) {
      throw new Error("URI cannot be empty");
    }

    const postUrl = this.apiBaseUrl + "/resolve-url";
    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uri }),
    });

    return this.handleResponse<{ url: string; host: string }>(response);
  };
}
