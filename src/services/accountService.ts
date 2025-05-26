import { api } from './api';

export type CurrentUserResponse = {
  user_name: string,
  email: string,
};

export type GroupRequest = {
  group_id: string,
};

export type GroupRoleResponse = {
  group_name: string,
  role: string,
};

export const getCurrentUser = async () => api.get<CurrentUserResponse>('/v1/user');
export const listGroupRoles = async () => api.get<GroupRoleResponse[]>('/v1/group');
export const setCurrentUserToGroup = async (request: GroupRequest) => api.post<any, any, GroupRequest>(
  '/v1/group', request,
);
