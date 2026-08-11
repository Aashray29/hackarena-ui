/**
 * Mock async helper. Replace the bodies of the service functions with
 * `fetch(`${API_BASE_URL}/...`)` calls once the REST backend is ready.
 */
export const API_BASE_URL = "/api";

export function delay<T>(data: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
