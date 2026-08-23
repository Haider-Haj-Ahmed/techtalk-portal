import client from './client';

// Feed
export const getFeed = (params) => client.get('/feed', { params });
export const getRecommended = (params) => client.get('/feed/recommended', { params });

// Posts
export const getPosts = (params) => client.get('/posts', { params });
export const getPost = (slug) => client.get(`/posts/${slug}`);
export const createPost = (data) => client.post('/posts', data);
export const updatePost = (id, data) => client.put(`/posts/${id}`, data);
export const deletePost = (id) => client.delete(`/posts/${id}`);

// Blogs
export const getBlogs = (params) => client.get('/blogs', { params });
export const getBlog = (slug) => client.get(`/blogs/${slug}`);
export const createBlog = (data) => client.post('/blogs', data);
export const updateBlog = (id, data) => client.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => client.delete(`/blogs/${id}`);

// Reactions
export const reactTo = (type, id, reaction) =>
  client.post(`/${type}/${id}/react`, { reaction });

// Save / bookmark
export const savePost = (id) => client.post(`/posts/${id}/save`);
export const unsavePost = (id) => client.delete(`/posts/${id}/save`);

// Search
export const search = (params) => client.get('/search', { params });

// Tags
export const getTags = () => client.get('/tags');
