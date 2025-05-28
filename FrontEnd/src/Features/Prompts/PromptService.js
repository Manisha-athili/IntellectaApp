import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/prompts';

export const fetchPrompts = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const savePrompt = async (prompt) => {
  const res = await axios.post(API_BASE, { prompt });
  return res.data;
};
