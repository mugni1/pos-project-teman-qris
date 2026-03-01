import Cookies from "js-cookie";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// INTIALIZATION
const createAxiosInstance = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL!;
  const timeout = parseInt(process.env.NEXT_PUBLIC_TIMEOUT!);
  const instance = axios.create({
    baseURL,
    timeout,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        window.location.href = "/login";
        Cookies.remove("token");
        Cookies.remove("role");
      }
      return Promise.reject(error);
    },
  );
  return instance;
};

// HTTP CLIENT
export const httpClient = {
  get: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return createAxiosInstance().get(url, config);
  },
  delete: (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return createAxiosInstance().delete(url, config);
  },
  post: (
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return createAxiosInstance().post(url, data, config);
  },
  put: (
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    return createAxiosInstance().put(url, data, config);
  },
};
