import axios from 'axios';

const PORT =  5000;
const API = axios.create({ baseURL: `http://localhost:${PORT}/api/auth` });

export default API