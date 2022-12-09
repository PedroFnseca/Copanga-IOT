import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
});

export default api;
