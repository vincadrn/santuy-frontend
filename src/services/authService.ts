import { AxiosResponse } from 'axios';
import { api } from './api';

export type SessionRequest = {
  redirect_uri: string;
};

export const requestLogin = async () => api.get('/v1/auth/login');
export const requestSession = async (uri: string) => api.post<any, AxiosResponse<any, any>, SessionRequest>(
  '/v1/auth/session', {
    redirect_uri: uri,
  }
);
export const clearSession = async () => api.get('/v1/logout');
