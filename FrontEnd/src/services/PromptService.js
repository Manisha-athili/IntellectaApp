import { api } from "../axios/axios.config";


const token = localStorage.getItem("token");

export const getAllPrompts = (queryParams = {}) =>
  api.get("/prompts", { params: queryParams });

export const getPromptById = (id) => api.get(`/prompts/${id}`);
export const createPrompt = (data) =>
  api.post("/prompts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const updatePrompt = (id, data) =>
  api.put(`/prompts/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePrompt = (id) =>
  api.delete(`/prompts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const toggleStarPrompt = (id) =>
  api.post(`/prompts/${id}/star`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const getStarredPromptsByUser = () =>
  api.get('/starred')

export const forkPrompt = (id) =>
  api.post(`/prompts/${id}/fork`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
