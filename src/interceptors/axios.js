import axios from "axios";

const baseURL = 'https://backend.eikompapp.com/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
	Authorization : `Bearer ${localStorage.getItem('access_token')}`,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== baseURL+"login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axiosInstance.post("refresh", {
            refresh: localStorage.getItem("refresh_token"),
          });
          
          console.log(rs)

          const { access_token } = rs.data.access;
          localStorage.setItem("access_token", access_token);
		  localStorage.setItem("refresh_token", rs.data.refresh);

		  axiosInstance.defaults.headers['Authorization'] =
		  'Bearer ' + rs.data.access;
	  
          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
