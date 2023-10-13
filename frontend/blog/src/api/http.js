import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default http;
