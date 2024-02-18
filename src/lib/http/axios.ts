import axios from "axios";
import { API_BASE_URL } from "../../config/config";

//CONFIGURE API HERE WITH CUSTOM HEADERS,ETC

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
