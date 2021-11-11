export type RequestOptions = {
  method?: RequestInit['method'];
  data?: any;
  query?: Record<string, string | string[]>;
};

const request = async <T>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  const headers: RequestInit['headers'] = {
    'content-type': 'application/json',
  };
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT ?? ''}${url}`,
    {
      method: options?.method,
      headers,
      body: JSON.stringify(options?.data),
      mode: 'cors',
    }
  );
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  const result = (await response.json()) as T;
  return result;
};

export const get = async <T>(
  url: string,
  options?: Omit<RequestOptions, 'method'>
) =>
  request<T>(url, {
    method: 'GET',
    ...(options || {}),
  });

export const post = async <T>(
  url: string,
  options?: Omit<RequestOptions, 'method'>
) =>
  request<T>(url, {
    method: 'POST',
    ...(options || {}),
  });

export const put = async <T>(
  url: string,
  options?: Omit<RequestOptions, 'method'>
) =>
  request<T>(url, {
    method: 'PUT',
    ...(options || {}),
  });

export const del = async <T>(
  url: string,
  options?: Omit<RequestOptions, 'method'>
) =>
  request<T>(url, {
    method: 'DELETE',
    ...(options || {}),
  });
