export interface User {
  userId: number
  userName: string
  password: string
  phone: string
  status: boolean
  role: Role
  email?: string
  createData?: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
