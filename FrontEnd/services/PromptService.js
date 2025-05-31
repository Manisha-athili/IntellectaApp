import api from '../src/api/axios';



export const getAllPrompts = (queryParams = {}) => api.get('/prompts',{params : queryParams});
export const getPromptById = (id) => api.get(`/prompts/${id}`);
export const createPrompt = (data) => api.post('/prompts', data);
export const updatePrompt = (id,data)=> api.put(`/prompts/${id}`,data)

export const deletePrompt = (id)=> api.delete(`/prompts/${id}`)

export const toggleStarPrompt = (id) => api.post(`/prompts/${id}/star`)

export const forkPrompt = (id) => api.post(`/prompts/${id}/fork`);

