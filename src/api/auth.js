import client from './client';

export const login = (data) => client.post('/auth/login', data);
export const register = (data) => client.post('/auth/register', data);
export const logout = () => client.post('/auth/logout');
export const verifyOtp = (data) => client.post('/auth/verify-otp', data);
export const resendOtp = (data) => client.post('/auth/resend-otp', data);
export const me = () => client.get('/auth/me');
