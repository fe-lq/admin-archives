import { User } from './user'

export interface Permission {
  id: number
  roleName: string
  members?: Pick<User, 'userId' | 'userName'>[]
  permissionScope?: Pick<MenuItem, 'id' | 'parentId' | 'menuName'>[]
}

export interface MenuItem {
  parentId?: number
  id: number
  level: number
  menuName: string
  menuPath: string
  permNode: string
  icon?: string
  children?: MenuItem[]
}

export interface PermFormType {
  roleName: string
  members: number[]
  permissionScope?: number[]
}
