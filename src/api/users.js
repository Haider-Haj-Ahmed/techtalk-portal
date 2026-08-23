import client from './client';

export const getProfile = (username) => client.get(`/users/${username}`);
export const updateProfile = (data) => client.put('/settings/profile', data);
export const follow = (username) => client.post(`/users/${username}/follow`);
export const unfollow = (username) => client.delete(`/users/${username}/follow`);
export const getFollowers = (username, params) =>
  client.get(`/users/${username}/followers`, { params });
export const getFollowing = (username, params) =>
  client.get(`/users/${username}/following`, { params });
