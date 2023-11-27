type ContentType = Readonly<{
  name: string;
  path: string;
  url: string;
}>;

type Project = Readonly<{
  name: string;
  contentTypes: readonly ContentType[];
}>;

export default async function (apiBaseUrl: string) {
  const url = apiBaseUrl + "/info";
  const response = await fetch(url);
  return response.json() as Promise<Project>;
}
