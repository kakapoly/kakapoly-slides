import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // TODO: manage the value in env
});

export default axiosInstance;
