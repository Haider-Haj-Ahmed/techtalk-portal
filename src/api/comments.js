import client from './client';

export const getComments = (type, id, params) =>
  client.get(`/${type}/${id}/comments`, { params });
export const createComment = (type, id, data) =>
  client.post(`/${type}/${id}/comments`, data);
export const updateComment = (id, data) => client.put(`/comments/${id}`, data);
export const deleteComment = (id) => client.delete(`/comments/${id}`);
export const reactToComment = (id, reaction) =>
  client.post(`/comments/${id}/react`, { reaction });
