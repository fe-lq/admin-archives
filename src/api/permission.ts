import { getRequest, postRequest } from '@/http'
import { MenuItem, PermFormType, Permission } from '@/types/permission'

export const getPermList = postRequest<Permission[]>('/permission/list')
export const createPerm = postRequest<unknown, Partial<PermFormType>>('/permission/add')
export const updatePerm = postRequest<unknown, PermFormType & { id: number }>('/permission/update')
export const deletePerm = getRequest<unknown, Pick<Permission, 'id'>>('/permission/delete')
export const readPerm = getRequest<Permission, Pick<Permission, 'id'>>('/permission/read')
export const getPermRang = postRequest<MenuItem[]>('/menu/list')
