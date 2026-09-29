import axios from "axios";

// Vite exposes env vars via import.meta.env (VITE_ prefix).
// Fallback covers any legacy REACT_APP_ reference or missing env.
const BACKEND_URL =
  import.meta.env?.VITE_BACKEND_URL ||
  "http://localhost:8000";

export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});
