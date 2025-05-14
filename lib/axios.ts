import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";

const getToken = async () => {
  const token = cookies().get("access_token")?.value;
  return token;
};

const serverUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const baseURL = `${serverUrl}`;

const client: AxiosInstance = axios.create({
  baseURL,
  timeout: 120000, // requesting for axios to wait respon from server
});

// Request interceptor
client.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Credentials"] = true;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    config.baseURL = baseURL;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("Unauthorized access. You might need to log in again.");
    } else if (status === 403) {
      console.warn("Forbidden access.");
    }

    return Promise.reject(error);
  }
);

export default client;
