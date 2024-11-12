import axios from "axios";

const BASE_URL = "http://localhost:9000/api/v1";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
