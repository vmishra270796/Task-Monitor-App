import http from './http';

export const listTasks = () => http.get('/tasks').then(r => r.data);
export const createTask = (payload) => http.post('/tasks', payload).then(r => r.data);
export const updateTask = (id, payload) => http.put(`/tasks/${id}`, payload).then(r => r.data);
export const deleteTask = (id) => http.delete(`/tasks/${id}`).then(r => r.data);
export const reorderTask = (payload) => http.post('/tasks/reorder', payload).then(r => r.data);
export const getTaskHistory = (id) => http.get(`/tasks/${id}/history`).then(r => r.data);

export const login = (payload) => http.post('/auth/login', payload).then(r => r.data);
export const register = (payload) => http.post('/auth/register', payload).then(r => r.data);
