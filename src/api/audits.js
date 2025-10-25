// client/src/api/audits.js
import http from './http';

export const listAudits = (taskId) =>
  http.get('/history', { params: { taskId } }).then(r => r.data);
