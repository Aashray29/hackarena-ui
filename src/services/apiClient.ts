const API_BASE_URL =
  import.meta.env["VITE_API_BASE_URL"] || "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth = true, headers, ...fetchOptions } = options;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const requestInit: RequestInit = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...headers,
    },
  };

  if (fetchOptions.body !== undefined) {
    requestInit.body = fetchOptions.body;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    requestInit,
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message || `Request failed: ${response.status}`,
    );
  }

  return data as T;
}

export const apiClient = {
  get<T>(endpoint: string, auth = true) {
    return request<T>(endpoint, {
      method: "GET",
      auth,
    });
  },

  post<T>(
    endpoint: string,
    body?: unknown,
    auth = true,
  ) {
    const options: RequestOptions = {
      method: "POST",
      auth,
    };

    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }

    return request<T>(endpoint, options);
  },

  put<T>(
    endpoint: string,
    body?: unknown,
    auth = true,
  ) {
    const options: RequestOptions = {
      method: "PUT",
      auth,
    };

    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }

    return request<T>(endpoint, options);
  },

  delete<T>(endpoint: string, auth = true) {
    return request<T>(endpoint, {
      method: "DELETE",
      auth,
    });
  },
};

export { API_BASE_URL };