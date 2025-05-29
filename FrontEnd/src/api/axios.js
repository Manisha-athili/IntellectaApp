import axios from "axios";

const PORT =  5000;
const api = axios.create({
    baseURL : `http://localhost:${PORT}/api`,
    withCredentials: true,
});

export default api;