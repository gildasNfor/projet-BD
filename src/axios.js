// jshint esversion:6
import axios from "axios";

const baseURL = "http://192.168.8.101:8000";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      console.log(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/dj-rest-auth/token/refresh/"
    ) {
      window.location.href = "auth/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        console.log("refresh token present");
        return axiosInstance
          .post("/dj-rest-auth/token/refresh/", { refresh: refreshToken })
          .then(response => {
            localStorage.setItem("access_token", response.data.access);
            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;
            console.log(`The new access token is ${response.data.access}`);
            console.log(`The original request is ${originalRequest}`);

            return axiosInstance(originalRequest);
          })
          .catch(err => {
            console.log(err);
            console.log("The refresh_token expired");
            window.location.href = "auth/login/";
          });
      } else {
        console.log("Refresh token not available.");
        window.location.href = "auth/login/";
      }
    }
    return Promise.reject(error);

    // specific error handling done elsewhere
  }
);

export default axiosInstance;
