const API_BASE_URL = "http://localhost:5000/api";

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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }

  return data;
}

export const apiClient = {
  get<T>(endpoint: string, auth = true) {
    return request<T>(endpoint, {
      method: "GET",
      auth,
    });
  },

  post<T>(endpoint: string, body?: unknown, auth = true) {
    return request<T>(endpoint, {
      method: "POST",
      auth,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body?: unknown, auth = true) {
    return request<T>(endpoint, {
      method: "PUT",
      auth,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, auth = true) {
    return request<T>(endpoint, {
      method: "DELETE",
      auth,
    });
  },
};

export { API_BASE_URL };