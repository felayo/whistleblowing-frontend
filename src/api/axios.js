import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Public instance (no auth)
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Private instance (uses cookies and tokens)
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { api, axiosPrivate };
