type FetchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

/**
 * Build URLSearchParams instance with support for arrays of values.
 *
 * By default, URLSearchParams will join arrays of values with a comma. This is
 * not desirable for our use case. Instead, we want arrays of values to be
 * represented as multiple entries with the same key.
 */
export function multiEntryParams(data: FetchParams) {
  let params: URLSearchParams;

  if (typeof data === "string" || data === undefined) {
    params = new URLSearchParams(data);
  } else {
    params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((inner) => {
          params.append(key, inner.toString());
        });
      } else {
        params.append(key, value.toString());
      }
    });
  }

  return params;
}

export const fetchInstance = (
  baseUrl: string,
  additionalHeaders?: object,
  buildParams?: (data: FetchParams) => URLSearchParams
) => {
  return async <ResponseType>({
    url,
    method,
    headers,
    params,
    data
  }: {
    url: string;
    method: "get" | "post" | "put" | "delete" | "patch" | "head";
    headers?: object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
    data?: BodyType<unknown>;
    signal?: AbortSignal;
  }) => {
    // We assume we are working with JSON requests and responses.
    const body = data ? JSON.stringify(data) : null;
    const builtParams = buildParams ? buildParams(params) : params;

    const response = await fetch(
      `${baseUrl}${url}${new URLSearchParams(builtParams)}`,
      {
        method,
        headers: {
          Accept: "application/json",
          ...headers,
          ...additionalHeaders
        },
        body
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    try {
      return (await response.json()) as ResponseType;
    } catch (e) {
      if (e instanceof SyntaxError) {
        // Do nothing. Responses may intentionally be empty and thus
        // cannot be converted to JSON. Fetch API and TypeScript has no clean
        // way for us to identify empty responses, so instead we swallow
        // syntax errors during decoding.
        return null;
      }
      throw e;
    }
  };
};

export default fetchInstance;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
