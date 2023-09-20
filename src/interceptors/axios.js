import axios from "axios";

const baseURL = 'https://backend.eikompapp.com/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for setting the Authorization header with the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== baseURL + "login-new" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const response = await axiosInstance.post("refresh", {
            refresh: localStorage.getItem("refresh_token"),
          });

          const { access_token } = response.data; // Use response.data directly

          localStorage.setItem("access_token", access_token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
