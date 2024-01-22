import { getRequest, postRequest } from '@/http'
import { User } from '@/types/user'

export const getUserList = postRequest<User[]>('/users/list')
export const createUser = postRequest<unknown, Partial<User>>('/users/add')
export const updateUser = postRequest<unknown, User>('/users/update')
export const deleteUser = getRequest<unknown, Pick<User, 'userId'>>('/users/delete')
export const readUser = getRequest<User, Pick<User, 'userId'>>('/users/read')
