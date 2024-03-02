import { getRequest, postRequest, http } from '@fe-lq/micro-kit'
import { User } from '@/types/user'
http.defaults.baseURL = import.meta.env.VITE_APP_BASE

export const getUserList = postRequest<User[]>('/users/list')
export const createUser = postRequest<unknown, Partial<User>>('/users/add')
export const updateUser = postRequest<unknown, User>('/users/update')
export const deleteUser = getRequest<unknown, Pick<User, 'userId'>>('/users/delete')
export const readUser = getRequest<User, Pick<User, 'userId'>>('/users/read')
