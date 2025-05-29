import api from '../../api/axios';


export const searchPrompts = (query) => api.get(`/prompts/search?searchWord=${query}`);
export const getAllPrompts = () => api.get('/prompts');
export const getPromptById = (id) => api.get 