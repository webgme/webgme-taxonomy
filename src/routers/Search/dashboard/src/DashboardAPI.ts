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

  getDashboardUrlFromUri = async (uri: string) => {
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

    if (!response.ok) {
      throw new StatusError(
        `${response.status} - ${response.statusText}`,
        response.status,
      );
    }

    return await response.json() as { url: string; host: string };
  };
}
